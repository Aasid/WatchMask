# development
import cv2
from maskdetector.mask_detector import MaskDetector
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# intialize objects
mask_detector = MaskDetector()



def live_feed():
    # load the video stream
    cap = cv2.VideoCapture(0)
    while True:
        # read the camera frame
        success, frame = cap.read()
        frame=cv2.resize(frame,(720,1280))
        (H, W) = frame.shape[:2]
        # if frame is not empty
        if(success):

            # pass frame to mask_detector and return labels and corresponding bounding boxes
            labels, bboxes = mask_detector.detect(frame)
            print(bboxes)
            print(labels)

            if(len(labels) > 0):
                # if a person is  wearing mask emit true
                if(labels[0] == "mask"):
                    print("Person is wearing mask")
                    socketio.emit('maskDetection', {'mask_detected': True,'bb':str(bboxes[0])})
                    socketio.sleep(0.000001)

                # if a person is not wearing mask emit flase
                else:
                    print("Person not wearing mask")
                    socketio.emit('maskDetection', {'mask_detected': False,'bb':str(bboxes[0])})
                    socketio.sleep(0.000001)


                # draw bounding box
                x1, y1, x2, y2 = bboxes[0]
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.rectangle(frame, (W//3, H//3), ((W//3)+(W//3),
                                                (H//3)+(H//3)), (0, 255, 0), 2)
        # show the output frame
        frame=cv2.resize(frame,(640,480))
        cv2.imshow("Frame", frame)
        key = cv2.waitKey(1) & 0xFF

        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break

# @socketio.on('connect')
# def connected():
#     print('connected')
#     live_feed()
    
@socketio.on('feed')
def initiate(data):
    print(data)
    live_feed()
    
if __name__ == '__main__':
    socketio.run(app, host=None, port=8756)
