import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { shaderMaterial } from '@react-three/drei';

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

class Inertia {
  constructor(from, to, acc, dec) {
    this.from = from;
    this.to = to;
    this.acc = acc;
    this.dec = dec;
    this.value = this.from;
    this.speed = 0;
  }

  update = (newValue) => {
    this.speed = this.speed + (newValue - this.value) * this.acc;
    this.speed = this.speed * this.dec;
    this.value += this.speed;
    this.value = this._clamp(this.value);

    return this.value;
  };

  setValue = (value) => {
    this.speed = 0;
    this.value = this._clamp(value);
    return this.value;
  };

  _clamp = (value) => {
    return Math.min(this.to, Math.max(this.from, value));
  };
}

const Rose = (props) => {
  const mesh = useRef(false);

  const state = useStore();

  const facePosition = useFacedetection();

  let positionInertia = {
    x: new Inertia(0, 1, 0.2, 0.2),
    y: new Inertia(0, 1, 0.2, 0.2),
  };

  useFrame(({clock}, delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (mesh.current) {
      positionInertia.x.update(facePosition.current.x);
      positionInertia.y.update(facePosition.current.y);

      const position = {x: (0.5 - positionInertia.x.value) * 5, y: (0.5 - positionInertia.y.value) * 5};
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
