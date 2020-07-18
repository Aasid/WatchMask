from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import argparse
import cv2
import os

class MaskDetector:
    
    def __init__(self):
        # load our serialized face detector model from disk
        print("[INFO] loading face detector model...")
        self.prototxtPath = os.path.sep.join(["maskdetector","face_detector", "deploy.prototxt"])
        self.weightsPath = os.path.sep.join(["maskdetector","face_detector",
            "res10_300x300_ssd_iter_140000.caffemodel"])
        self.net = cv2.dnn.readNet(self.prototxtPath, self.weightsPath)

        # load the face mask detector model from disk
        print("[INFO] loading face mask detector model...")
        self.model = load_model("maskdetector/mask_detector_hybrid.model")
    def detect(self, img):
        # load the input image from disk, clone it, and grab the image spatial
        # dimensions
        # image = cv2.imread(img)
        image = img
        orig = image.copy()
        (h, w) = image.shape[:2]

        # construct a blob from the image
        blob = cv2.dnn.blobFromImage(image, 1.0, (300, 300),
            (104.0, 177.0, 123.0))

        # pass the blob through the network and obtain the face detections
        print("[INFO] computing face detections...")
        self.net.setInput(blob)
        detections = self.net.forward()
        labels=[]
        bboxs=[]
        # loop over the detections
        for i in range(0, detections.shape[2]):
            # extract the confidence (i.e., probability) associated with
            # the detection
            confidence = detections[0, 0, i, 2]

            # filter out weak detections by ensuring the confidence is
            # greater than the minimum confidence
            if confidence > 0.5:
                # compute the (x, y)-coordinates of the bounding box for
                # the object
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (startX, startY, endX, endY) = box.astype("int")

                # ensure the bounding boxes fall within the dimensions of
                # the frame
                (startX, startY) = (max(0, startX), max(0, startY))
                (endX, endY) = (min(w - 1, endX), min(h - 1, endY))

                # extract the face ROI, convert it from BGR to RGB channel
                # ordering, resize it to 224x224, and preprocess it
                face = image[startY:endY, startX:endX]
                face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
                face = cv2.resize(face, (224, 224))
                face = img_to_array(face)
                face = preprocess_input(face)
                face = np.expand_dims(face, axis=0)

                # pass the face through the model to determine if the face
                # has a mask or not
                (mask, withoutMask) = self.model.predict(face)[0]

                # determine the class label and color we'll use to draw
                # the bounding box and text
                label = "mask" if mask > withoutMask else "no_mask"
                # print(label)
                labels.append(label)
                # print(startX, startY, endX, endY)
                bboxs.append((startX, startY, endX, endY))
        # show the output image
        # print(labels)
        # print(bboxs)
        return labels,bboxs