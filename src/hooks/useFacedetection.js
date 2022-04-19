import React, {useRef, useEffect} from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection } from "@mediapipe/face_detection";
import { useThree } from '@react-three/fiber';

class Inertia {
  constructor(from, to, acc, dec) {
    this.from = from;
    this.to = to;
    this.acc = acc;
    this.dec = dec;
    this.value = this.from;
    this.speed = 0;
  }

  update = newValue => {
    this.speed = this.speed + (newValue - this.value) * this.acc;
    this.speed = this.speed * this.dec;
    this.value += this.speed;
    this.value = this._clamp(this.value);

    return this.value;
  };

  setValue = value => {
    this.speed = 0;
    this.value = this._clamp(value);
    return this.value;
  };

  _clamp = value => {
    return Math.min(this.to, Math.max(this.from, value));
  };
}

const useFacedetection = () => {
  let facePosition = useRef(
    {
      x: 0,
      y: 0
    },
  );

  const { viewport } = useThree();

  let positionInertia = {
    x: new Inertia(0, 1, 0.2, 0.2),
    y: new Inertia(0, 1, 0.2, 0.2), 
  }

  useEffect(() => {
    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);

    function onResults(results) {
      if (results.detections && results.detections.length && results.detections[0].boundingBox) {
        let boundingBox = results.detections[0].boundingBox;
  
        positionInertia.x.update(boundingBox.xCenter);
        positionInertia.y.update(boundingBox.yCenter);

        facePosition.current = {
          x: positionInertia.x.value,
          y: positionInertia.y.value
        }
      } 
    }
  
    const faceDetection = new FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
      },
    });
  
    faceDetection.setOptions({
      // modelSelection: 0,
      model: "short",
      minDetectionConfidence: 0.5,
    });
  
    faceDetection.onResults(onResults);

    const cameraSource = new Camera(videoElement, {
      onFrame: async () => {
        await faceDetection.send({ image: videoElement });
        // await holistic.send({ image: videoElement });
      },
      width: viewport.width,
      height: viewport.height,
    });

    cameraSource.start();
  }, []);

  return facePosition;
}

export default useFacedetection;
