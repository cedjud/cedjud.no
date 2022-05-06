import {
  OrthographicCamera,
  OrbitControls
} from '@react-three/drei';
import {
  EffectComposer,
  Pixelation,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';

import Blob from './Blob';
import NoiseQuad from '../NoiseQuad';

function Scene({}) {
  return (
    <>
      <color attach='background' args={['#08404d']} />

      <OrthographicCamera makeDefault args={[-1, 1, 1, -1, -2, 1]} zoom={600} />
      <OrbitControls />

      <NoiseQuad />
      {/* <Blob /> */}

      <EffectComposer>
        <Bloom
          intensity={4.0}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        <Pixelation granularity={40} />
      </EffectComposer>
    </>
  );
}

export default Scene;
