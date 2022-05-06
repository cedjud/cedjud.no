import { useRef, useEffect } from "react";

import {
  OrthographicCamera,
} from "@react-three/drei";

import {
  EffectComposer,
  Pixelation,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";

import MouseNoise from '../MouseNoise';

function Scene({}) {
  return (
    <>
      <color attach="background" args={["#08404d"]} />
      <OrthographicCamera makeDefault args={[-1, 1, 1, -1, -2, 1]} zoom={600}/>

			<MouseNoise />

      <EffectComposer>
        <Bloom intensity={4.0} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        <Pixelation granularity={50} />
      </EffectComposer>
    </>
  );
}

export default Scene;