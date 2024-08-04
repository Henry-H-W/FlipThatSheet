from flask import Flask, jsonify, render_template, Response, request, app
from flask_sse import sse
import tensorflow as tf
import cv2
import numpy as np
import mediapipe as mp

from keras.models import Sequential
from keras.layers import LSTM, Dense
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["REDIS_URL"]="redis://127.0.0.1:6379"
app.register_blueprint(sse, url_prefix='/events')

# Setup medaipipe
mp_holistic = mp.solutions.holistic  # Holistic model
mp_drawing = mp.solutions.drawing_utils  # Drawing utilities


# Mediapipe pose detection function
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # COLOR COVERSION RGB 2 BGR
    return image, results


# Draw pose and face landmarks
def draw_styled_landmarks(image, results):
    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                              mp_drawing.DrawingSpec(color=(80, 110, 10), thickness=1, circle_radius=1),
                              mp_drawing.DrawingSpec(color=(80, 256, 121), thickness=1, circle_radius=1)
                              )
    # # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(80, 22, 10), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(80, 44, 121), thickness=2, circle_radius=2)
                              )

# Extract pose and face landmarks and format in np array
def extract_keypoints(results):
    # Extract all pose and landmarks, and flatten. If pose/face not detected, return 0 array
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(132)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(1404)
    # Return landmarks
    return np.concatenate([pose, face])

# Make head tilt prediction
def predict(sequence):
    res = headModel.predict(np.expand_dims(np.array(sequence), axis=0))
    return res

# Communicate with frontend
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(run_cam(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/requests',methods=['POST'])
def tasks():
    global run,cap
    if (run == 1):
        run = 0
        cap.release()
        cv2.destroyAllWindows()

    else:
        cap = cv2.VideoCapture(0)
        run = 1
    return str(run)

@app.route('/prediction',methods=['GET'])
def predictGet():
    # Create a Python dictionary with some data
    data = list()
    data.append(
    {
        'prediction': actions[prediction]
    })
    # Return a JSON response using the jsonify() function
    return data

def server_side_event(prev):
    new = predictGet()
    print(prev, new)
    if new!=prev:
        sse.publish(new, type='customer')
        prev=new
    return prev

# Setup webcam
cap = cv2.VideoCapture(0)

headModel = Sequential()
headModel.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(20,1536)))
headModel.add(LSTM(128, return_sequences=True, activation='relu'))
headModel.add(LSTM(64, return_sequences=False, activation='relu'))
headModel.add(Dense(64, activation='relu'))
headModel.add(Dense(32, activation='relu'))
headModel.add(Dense(3, activation='softmax'))

headModel.load_weights('headTiltModel.h5')

def run_cam():
    global sequence, predTimer, lastPred, actions, run, prediction
    # Records 20 frame sequences of mediapipe landmarks
    sequence = []
    predTimer = 0
    lastPred = ''
    actions = ['Left', 'Right', 'Neutral']
    run = 0
    prev = "Neutral"

    while True:
        with mp_holistic.Holistic(min_detection_confidence=0.9, min_tracking_confidence=0.9) as holistic:
            while cap.isOpened() and run == 1:

                # Read feed from webcam
                ret, frame = cap.read()

                # Mediapipe detection
                image, results = mediapipe_detection(frame, holistic)

                # Draw landmarks
                draw_styled_landmarks(image, results)

                keypoints = extract_keypoints(results)
                sequence.append(keypoints)
                sequence = sequence[-20:]

                predTimer += 1

                if(predTimer%5 == 0 and len(sequence) == 20):
                    res = predict(sequence)
                    predTimer = 0
                    prediction = np.argmax(res)

                    if(prediction == 0 or prediction == 1):
                        if(res[0][prediction] < 0.80):
                            prediction = 2
                    
                    with app.app_context():
                        prev=server_side_event(prev)

                frameBytes = frame.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frameBytes + b'\r\n')
    
if __name__ == '__main__':
    print("fdsfds")
    app.run(port=5000, threaded=True, use_reloader=False)