
# FlipThatSheet

FlipThatSheet is an innovative solution designed to help musicians in turning music sheet pages hands-free, using simple head movements. This project was developed during HackThe6ix to address the common challenge musicians face when they need to flip through music sheets with their hands while playing their instruments.


## Features

- Unlimited PDF uploads
- Save all your imported music sheets
- Flip music sheets via head tilt

## Setup and Use

Cloning the repo and installing required packages
```
git clone https://github.com/Henry-H-W/FlipThatSheet.git
npm install
cd FlipThatSheet
```

Setting up Python backend
```
cd flask
pip install -r requirements.txt
main.py
```

Setting up Node.js backend
```
# In a new terminal
cd server
node server.js
```

To set up the Redis backend, follow documentation [here.](
https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)
(If you are installing on Windows, make sure you have virtualization enabled through your machine's BIOS.)

Run local host
```
# In a new terminal
cd client
npm start
```

## Tech Stack

Frontend: 
- Frameworks & Libraries: Next.js, React
- Libraries: Material-UI, Tailwind CSS

Backend: 
- Languages & Frameworks: Python, Flask, Express, Node.js

Databases: 
- Primary Database: MongoDB
- In-Memory Data Store: Redis

Authentication: 
- Provider: Auth0

Machine Learning & Computer Vision: 
- Libraries & Tools: TensorFlow, MediaPipe, OpenCV

## Screenshots
![App Screenshot](https://github.com/Henry-H-W/FlipThatSheet/raw/main/FlipThatSheet.png)
![PDF Upload Screenshot](https://github.com/Henry-H-W/FlipThatSheet/raw/main/UploadDemo.png)

## Demo

https://drive.google.com/file/d/1er-HUw9y7xdWkmxuD_7f0Z2eg0hpYiJX/view