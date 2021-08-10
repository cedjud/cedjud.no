import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { useRef } from 'react';
import { shaderMaterial } from '@react-three/drei';

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

  useFrame(({mouse, clock, viewport}, delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (mesh.current) {
      mesh.current.material.uniforms.mouse.value = mouse;
      mesh.current.material.uniforms.time.value = elapsedTime / 2 + (mouse.x);
      // mesh.current.rotation.x = mesh.current.rotation.y += 0.001;
      // mesh.current.position.set((mouse.x * viewport.width) / 2, 0, 0);
    }
  });

  return (
    <mesh
      ref={mesh}
      {...props}
      position={[0, 0, -1]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[1.5, 256, 256]} />
      <roseMaterial attach='material' time={3} />
    </mesh>
  );
};

export default Rose;
