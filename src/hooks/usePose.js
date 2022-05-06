import React, { useEffect, useRef, useState  } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
// import vec3 from 'vec3';

const usePose = () => {
  const [debug, setDebug] = useState(false);
  const positions = useRef(null);

  useEffect(() => {
    const width = 1280;
    const height = 720;

    const videoElement = document.createElement("video");
    document.body.appendChild(videoElement);

    const canvasElement = document.createElement("canvas");
    canvasElement.width = width;
    canvasElement.height = height;
    const canvasCtx = canvasElement.getContext("2d");
    document.body.appendChild(canvasElement);

    // const landmarksContainer = document.createElement('div');
    // const grid = new LandmarkGrid(landmarkContainer);


    const draw = (canvasCtx, results, width, height) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // canvasCtx.drawImage(results.segmentationMask, 0, 0,
      //                     canvasElement.width, canvasElement.height);

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#00FF00";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite missing pixels.
      // canvasCtx.globalCompositeOperation = "destination-atop";
      // canvasCtx.drawImage(
      //   results.image,
      //   0,
      //   0,
      //   canvasElement.width,
      //   canvasElement.height
      // );

      canvasCtx.globalCompositeOperation = "source-over";
      // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      //                {color: '#00FF00', lineWidth: 4});
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.restore();
    }

    let previousResults = null;

    // const calculateDiffs = (a, b) => {
    //   let v1 = vec3(a.x, a.y, a.z);
    //   let v2 = vec3(b.x, b.y, b.z);
    //   return v1.distanceTo(v2);
    // }

    function onResults(results) {
      if(!results || !results.poseLandmarks) {
        return
      }

      const simpleResults = {
        nose: results.poseLandmarks[0],
        rightIndex: results.poseLandmarks[20],
        leftIndex: results.poseLandmarks[19]
      }

      // if (!previousResults) {
      //   previousResults = simpleResults;
      // }

      // const diffs = {
      //   nose: calculateDiffs(simpleResults.nose, previousResults.nose),
      //   rightIndex: calculateDiffs(simpleResults.rightIndex, previousResults.rightIndex),
      //   leftIndex: calculateDiffs(simpleResults.leftIndex, previousResults.leftIndex),
      // }

      // previousResults = simpleResults;


      // console.log('simpleResults : ', simpleResults);
      positions.current = simpleResults;

      if (debug) {
        draw(canvasCtx, results, width, height);
      }
    }

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width,
      height,
    });
    camera.start();

    return () => {
      videoElement.remove();
      canvasElement.remove();

      [...document.querySelectorAll('script')].forEach(script => {
        if (script.src.includes('@mediapipe')) {
          script.remove()
        }
      })
    }
  }, []);

  return positions;
};

export default usePose;
