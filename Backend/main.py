# development
import cv2
from maskdetector.mask_detector import MaskDetector

## intialize objects 
mask_detector =MaskDetector()

def live_feed():
    # load the video stream
    cap= cv2.VideoCapture("/home/phi/Neuroplex/mask_detection/a.mp4")
    while True:
        # read the camera frame
        success, frame = cap.read()
        # if frame is not empty
        if(success):
            # pass frame to mask_detector and return labels and corresponding bounding boxes
            labels,bboxes = mask_detector.detect(frame)
            print(bboxes)
            print(labels)
            
            if(len(labels)>0):
                #if a person is  wearing mask emit true
                if(labels[0]=="mask"):
                    print("Person is wearing mask")
                #if a person is not wearing mask emit flase
                else:
                    print("Person not wearing mask")
                    
if __name__ == '__main__':
    live_feed()