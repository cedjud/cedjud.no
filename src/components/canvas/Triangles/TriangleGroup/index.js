import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import Triangle from '../Triangle';
import { LottieLoader } from 'three-stdlib';

const TriangleGroup = ({ position, svgShape, groupIndex, noise }) => {
  const groupRef = useRef();

  // console.log('groupIndex : ', groupIndex / 9);

  // console.log([groupIndex % 9, Math.floor(groupIndex / 9)]);


  useFrame(({clock}) => {
    const { elapsedTime } = clock;

    if (groupRef.current && noise.current) {
      const scaleZ = (2 - noise.current.noise2D(
        ((groupIndex % 9) * 0.05) + elapsedTime * 0.1,
        (Math.floor(groupIndex / 9) * 0.05) + elapsedTime * 0.1
      )) * 2;

      groupRef.current.scale.z = scaleZ;
    }
  })

  return (
    <group
      ref={groupRef}
      scale={[1, -1, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
    >
      {svgShape &&
        svgShape.map((shape, index) => {
          // console.log('scaleZ : ', scaleZ);
          return (
            <Triangle
              key={`triangle-${shape.uuid}`}
              index={index}
              groupIndex={groupIndex}
              shape={shape}
              // scaleZ={scaleZ}
              noise={noise}
            />
          );
        })}
    </group>
  );
};

export default TriangleGroup;
