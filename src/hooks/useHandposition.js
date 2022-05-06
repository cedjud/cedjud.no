import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';

// class Inertia {
//   constructor(from, to, acc, dec) {
//     this.from = from;
//     this.to = to;
//     this.acc = acc;
//     this.dec = dec;
//     this.value = this.from;
//     this.speed = 0;
//   }

//   update = (newValue) => {
//     this.speed = this.speed + (newValue - this.value) * this.acc;
//     this.speed = this.speed * this.dec;
//     this.value += this.speed;
//     this.value = this._clamp(this.value);

//     return this.value;
//   };

//   setValue = (value) => {
//     this.speed = 0;
//     this.value = this._clamp(value);
//     return this.value;
//   };

//   _clamp = (value) => {
//     return Math.min(this.to, Math.max(this.from, value));
//   };
// }

const useHandposition = () => {
  let handPosition = useRef({ x: 0.5, y: 0.5 });

  // let positionInertia = {
  //   x: new Inertia(0, 1, 0.2, 0.2),
  //   y: new Inertia(0, 1, 0.2, 0.2),
  // };

  useEffect(() => {
    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);

    function onHandsResults(results) {
      let hand = results.multiHandLandmarks;
  
      if (!hand.length) {
        return;
      }

      let currentPosition = hand[0][0];
      handPosition.current = {
        x: currentPosition.x,
        y: currentPosition.y
      }
    }

    const hands = new Hands({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});
    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(onHandsResults);

    const cameraSource = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({image: videoElement});
      },
      width: 1280,
      height: 720,
    });

    cameraSource.start();
  }, []);

  return handPosition;
};

export default useHandposition;
