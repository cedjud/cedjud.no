import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Ring, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
// import glsl from "babel-plugin-glsl/macro";

import vertex from './shaders/shader.vs';
import fragment from './shaders/shader.fs';

import usePose from "../../../hooks/usePose";

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    nose: new THREE.Vector2(0, 0),
    rightIndex: new THREE.Vector2(0, 0),
    leftIndex: new THREE.Vector2(0, 0),
    color: new THREE.Color(1.0, 0.5, 0.1),
  },
  // vertex shader
  vertex,

  // fragment shader
  fragment
);

// gl_FragColor.rgba = vec4(0.9568, 0.8745, 0.8, vNoise);
// gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);

extend({ ColorShiftMaterial });

const NoiseQuad = () => {
  const materialRef = useRef();

  // const pose = usePose();

  useFrame(({ clock, mouse }) => {
    // console.log('nose : ', nose);
    // console.log(pose);
    if (materialRef.current) {
      // console.log(materialRef.current.uniforms.time.value)
      // materialRef.current.uniforms.nose.value = {x: pose.current.nose[0], y: pose.current.nose[1]};
      // if (pose && pose.current && pose.current.nose) {
      //   materialRef.current.uniforms.nose.value = {
      //     x: pose.current.nose.x,
      //     y: pose.current.nose.y,
      //   };
      // }
      // if (pose && pose.current && pose.current.rightIndex) {
      //   materialRef.current.uniforms.rightIndex.value = {
      //     x: pose.current.rightIndex.x,
      //     y: pose.current.rightIndex.y,
      //   };
      // }
      // if (pose && pose.current && pose.current.leftIndex) {
      //   materialRef.current.uniforms.leftIndex.value = {
      //     x: pose.current.leftIndex.x,
      //     y: pose.current.leftIndex.y,
      //   };
      // }
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeBufferGeometry args={[4, 4, 128, 128]} />
      <colorShiftMaterial
        ref={materialRef}
        color="blue"
        time={1}
        nose={new THREE.Vector2(0, 0)}
        rightIndex={new THREE.Vector2(0, 0)}
        leftIndex={new THREE.Vector2(0, 0)}
        transparent={true}
      />
    </mesh>
  );
};

export default NoiseQuad;
