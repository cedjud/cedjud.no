import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
// import glsl from "babel-plugin-glsl/macro";

import vertex from './shaders/shader.vs';
import fragment from './shaders/shader.fs';

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0, 0),
    color: new THREE.Color(1.0, 0.5, 0.1),
  },
  vertex,
  fragment
);

extend({ ColorShiftMaterial });

const NoiseQuad = () => {
  const materialRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.elapsedTime;
    }

    materialRef.current.uniforms.mouse.value = mouse;
  });

  return (
    <mesh>
      <planeBufferGeometry args={[4, 4, 128, 128]} />
      <colorShiftMaterial
        ref={materialRef}
        color='blue'
        time={1}
        mouse={new THREE.Vector2(0, 0)}
        transparent={true}
      />
    </mesh>
  );
};

export default NoiseQuad;
