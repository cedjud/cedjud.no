import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { useDrag } from '@use-gesture/react'


import useStore from '@/helpers/store';
import useFacedetection from '@/hooks/useFacedetection';

import vertex from './shaders/shader.vs';
import fragment from './shaders/shader.fs';

const RoseMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(),
    color: new THREE.Color(0.05, 0.0, 0.025),
    // wireframe: true,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  },
  vertex,
  fragment
);

extend({ RoseMaterial });

const Rose = (props) => {
  const mesh = useRef(false);

  const state = useStore();

  const facePosition = useFacedetection();

  useFrame(({mouse, clock, viewport}, delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (mesh.current) {

      const position = {x: (0.5 - facePosition.current.x) * 3, y: (0.5 - facePosition.current.y) * 5};
      mesh.current.material.uniforms.mouse.value = position;
      if (state && state.cursor) {
        // const position = {x: ((state.cursor.x / window.innerWidth) - 0.5) * 2, y: ((state.cursor.y / window.innerHeight) - 0.5) * 2};
        // mesh.current.material.uniforms.mouse.value = position;

        // console.log(position);
        // console.log({x: (state.cursor.x / window.innerWidth) - 0.5, y: (state.cursor.y / window.innerHeight) - 0.5})
      }
      // mesh.current.material.uniforms.mouse.value = mouse;
      // mesh.current.material.uniforms.time.value = elapsedTime / 2 + (mouse.x);
      mesh.current.material.uniforms.time.value = elapsedTime * 0.5;



      // mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
      // mesh.current.position.set((mouse.x * viewport.width) / 2, 0, 0);
    }
  });

  return (
    <mesh
      ref={mesh}
      {...props}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[1.5, 256, 256]} />
      <roseMaterial attach='material' time={3} />
    </mesh>
  );
};

export default Rose;
