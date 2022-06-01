import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// const PI = Math.PI;
// const TWO_PI = Math.PI * 2;

// const createTriangleShape = () => {
//   console.log('createTriangleShape : ');

//   const shape = new THREE.Shape();

//   const minus = -1;
//   const plus = 1;
//   const r = 0.1;

//   const angleDistance = TWO_PI * 1.125 - PI * 1.5;

//   shape.moveTo(minus + r, minus);
//   shape.lineTo(plus - r, minus);
//   // shape.absarc(plus - r / 2, minus + r / 2, r / 2, PI * 1.5, TWO_PI * 1.125);
//   shape.lineTo(1 - r, minus + r);
//   shape.lineTo(minus + r, 1 - r);
//   // shape.absarc(
//   //   minus + r / 2,
//   //   plus - r / 2,
//   //   r / 2,
//   //   PI * 0.25,
//   //   PI * 0.25 + angleDistance
//   // );
//   shape.lineTo(minus, plus - r);
//   // shape.absarc(r, r, r, Math.PI, Math.PI * 1.5);
//   shape.lineTo(minus, minus + r);

//   return shape;
// };

// const betterCreateTriangleShape = (xMin, xMax, yMin, yMax, invert = false) => {
//   console.log('createTriangleShape : ');

//   const shape = new THREE.Shape();

//   // const minus = -1;
//   // const plus = 1;
//   const length = xMax - xMin;
//   const r = length * 0.03;

//   // const localXMax = xMax - (r /2);
//   // const localXMin = 


//   // const angleDistance = TWO_PI * 1.125 - PI * 1.5;

//   if (invert) {
//     shape.moveTo(xMax - r * 2, yMax - r)
//     shape.lineTo(xMax - r, yMax - r)
//     shape.lineTo(xMax - r, yMin + r * 2)
//     shape.lineTo(xMin + r * 2, yMax - r)
//   } else {
//     shape.moveTo(xMin + r, yMin + r)
//     shape.lineTo(xMax - r * 2, yMin + r)
//     shape.lineTo(xMin + r, yMax - r * 2)
//   }


//   // shape.moveTo(minus + r, minus);
//   // shape.lineTo(plus - r, minus);
//   // // shape.absarc(plus - r / 2, minus + r / 2, r / 2, PI * 1.5, TWO_PI * 1.125);
//   // shape.lineTo(1 - r, minus + r);
//   // shape.lineTo(minus + r, 1 - r);
//   // // shape.absarc(
//   // //   minus + r / 2,
//   // //   plus - r / 2,
//   // //   r / 2,
//   // //   PI * 0.25,
//   // //   PI * 0.25 + angleDistance
//   // // );
//   // shape.lineTo(minus, plus - r);
//   // // shape.absarc(r, r, r, Math.PI, Math.PI * 1.5);
//   // shape.lineTo(minus, minus + r);

//   return shape;
// };

function Triangle({shape, index, noise, groupIndex}) {
  const meshRef = useRef();
  const geometryRef = useRef();
  // const scaleFactorRef = useRef((Math.random() * 1.0))
  const scaleFactorRef = useRef(groupIndex / 50)

  const extrudeSettings = {
    steps: 1,
    depth: 10,
    bevelEnabled: false
  };

  useFrame(({clock}) => {
    const { elapsedTime } = clock;

    if (meshRef.current && noise.current) {
      const scaleZ = (2 - noise.current.noise2D(
        (groupIndex + index) + elapsedTime * 0.1, 0
        // ((groupIndex % 9) * 0.1) + elapsedTime * 0.3,
        // (Math.floor(index / 9) * 0.1) + elapsedTime * 0.0
      )) * scaleFactorRef.current;

      meshRef.current.scale.z = scaleZ;
    }
  })

  return (
    <group>
      {/* <mesh scale={[1, 1,  Math.ceil((2 - scaleZ) * 3)]} ref={meshRef}>  */}
      <mesh scale={[1, 1, 1]} ref={meshRef}> 
        <extrudeBufferGeometry args={[shape, extrudeSettings]} ref={geometryRef}/>
        <meshStandardMaterial color='#E9C46A' side={THREE.DoubleSide} transparent={true}  />
      </mesh>
    </group>
  );
}

export default Triangle;
