import tensorflow as tf
import cv2
import numpy as np
import mediapipe as mp

from keras.models import Sequential
from keras.layers import LSTM, Dense
from matplotlib import pyplot as plt

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

# Setup webcam
cap = cv2.VideoCapture(0)

# Records 20 frame sequences of mediapipe landmarks
sequence = []
predTimer = 0
lastPred = ''
actions = ['Left', 'Right', 'Neutral']

headModel = Sequential()
headModel.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(20,1536)))
headModel.add(LSTM(128, return_sequences=True, activation='relu'))
headModel.add(LSTM(64, return_sequences=False, activation='relu'))
headModel.add(Dense(64, activation='relu'))
headModel.add(Dense(32, activation='relu'))
headModel.add(Dense(3, activation='softmax'))

headModel.load_weights('headTiltModel.h5')

with mp_holistic.Holistic(min_detection_confidence=0.9, min_tracking_confidence=0.9) as holistic:
    while cap.isOpened():

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
                if(res[0][prediction] < 0.85):
                    prediction = 2

            cv2.putText(image, actions[prediction] + " " + str(res[0][prediction]),
                        (3, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        elif(len(sequence) == 20):
            cv2.putText(image, actions[prediction] + " " + str(res[0][prediction]),
                        (3, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

        # Show webcam DEBUG
        cv2.imshow('OpenCV Feed', image)

        # End
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
