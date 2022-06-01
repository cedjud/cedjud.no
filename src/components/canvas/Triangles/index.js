import { useEffect, useRef, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import {
  // Box,
  Instance,
  Instances,
  OrbitControls,
  OrthographicCamera,
  Stats,
} from '@react-three/drei';
// import {
//   EffectComposer,
//   Pixelation,
//   Bloom,
//   Vignette,
// } from '@react-three/postprocessing';
import SimplexNoise from 'simplex-noise';

import useSVGShapes from '@/hooks/useSVGShapes';

// import Triangle from './Triangle';
import TriangleGroup from './TriangleGroup';

const useNoise = () => {
  let noiseRef = useRef();

  useEffect(() => {
    noiseRef.current = new SimplexNoise();
  }, []);

  return noiseRef;
};

const createPositionsGrid = (count) => {
  const positions = [];

  const scale = 100;
  const offset = (scale * count) / 2;

  // console.log('scale, offset : ', scale, offset);

  for (let i = 0; i <= count; i++) {
    for (let j = 0; j <= count; j++) {
      const x = offset - i * scale;
      const z = offset - j * scale;
      positions.push([x, 0, z]);
    }
  }

  return positions;
};

function Scene({}) {
  const noise = useNoise();

  const positions = useMemo(() => createPositionsGrid(8), []);

  const svgShapes = useSVGShapes();

  // const scaleZ = noise.current.noise2D(29, 1);
  // console.log(scaleZ);
  useEffect(() => {
    if (noise.current) {
      const scaleZ = noise.current.noise2D(29, 1);
      console.log(scaleZ);
    }
  }, [])

  return (
    <>
      <Stats showPanel={0} className='stats' />
      <color attach='background' args={['#2A9D8F']} />
      <OrthographicCamera
        makeDefault
        args={[-1, 1, 1, -1, -2000, 2000]}
        zoom={2}
        position={[0.125, 0.05, 0.1]}
      />
      {/* <axesHelper args={500}/> */}
      <ambientLight args={['#404040', 0.2]} />
      <hemisphereLight args={['#F6CBC0', '#C6DCE5', 0.5]} />

      <pointLight args={['#F6CBC0', 1]} position={[-200, 100, 40]} />
      <pointLight args={['#C6DCE5', 1]} position={[300, 200, -30]} />

      <OrbitControls />

      {/* <TriangleGroup position={[0, 0, 0]} noise={noise} />
      <TriangleGroup position={[100, 0, 0]}/>
      <TriangleGroup position={[100, 0, 100]}/> */}

      {/* <Instances> */}
      {positions.length &&
        positions.map((position, index) => (
          <TriangleGroup
            key={`trianglegroup-${index}`}
            groupIndex={index}
            position={position}
            svgShape={svgShapes}
            noise={noise}
          />
        ))}

      {/* </Instances> */}
      {/* <NoiseQuad /> */}

      {/* <EffectComposer> */}
      {/* <Bloom
          intensity={0.8}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={0.3} /> */}
      {/* <Pixelation granularity={40} /> */}
      {/* </EffectComposer> */}
    </>
  );
}

export default Scene;
