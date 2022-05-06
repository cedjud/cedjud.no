import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshWobbleMaterial,
  MeshDistortMaterial,
  OrthographicCamera,
} from "@react-three/drei";
import SimplexNoise from "simplex-noise";
import lerp from "lerp";
import {
  EffectComposer,
  DepthOfField,
  Pixelation,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

// import Thing from '../Thing';
// import NoiseQuad from "../NoiseQuad";
// import NoiseQuad from "../PoseNoise";
// import NoiseQuad from '../MouseNoise';
import NoiseQuad from '../HandNoise';

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function Scene({}) {
  const noiseRef = useRef(null);
  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const meshRef = useRef();
	const cameraRef = useRef();

  useEffect(() => {
    // const simplex = new SimplexNoise();
    // noiseRef.current = simplex;

		// console.log('cameraRef.current : ', cameraRef.current);
		// cameraRef.current.zoom = 100;
  }, []);

  // useFrame(({ clock, mouse }) => {
  //   const elapsedTime = clock.elapsedTime;
  //   if (meshRef.current && noiseRef.current) {
  //     const noiseValueX = noiseRef.current.noise2D(elapsedTime * 0.1, 1);
  //     const noiseValueY = noiseRef.current.noise2D(elapsedTime * 0.2, 1);

  //     meshRef.current.position.x = scale(noiseValueX, -1, 1, -3, 3);
  //     meshRef.current.position.y = scale(noiseValueY, -1, 1, -3, 3);

  //     meshRef.current.scale.x = scale(noiseValueX, -1, 1, 1, 3);
  //     meshRef.current.scale.y = scale(noiseValueY, -1, 1, 1, 3);
  //   }
  // });

  return (
    <>
      <color attach="background" args={["#08404d"]} />
      {/* <ambientLight /> */}
      {/* <OrbitControls /> */}
      {/* <Thing /> */}
{/* 
			<pointLight ref={lightRef1} args={["yellow", 1, 100]} position={[2, 0, 2]}/>
			<pointLight ref={lightRef2} args={["yellow", 1, 100]} position={[-2, 0, 2]}/> */}

      <OrthographicCamera ref={cameraRef} makeDefault args={[-1, 1, 1, -1, -2, 1]} zoom={600}/>

			{/* <mesh ref={meshRef}>
				<sphereGeometry />
				<MeshDistortMaterial factor={100} speed={5} color="red" />
			</mesh> */}

			<NoiseQuad />

      <EffectComposer>
        <Bloom intensity={4.0} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        {/* <Noise opacity={0.01} /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
        <Pixelation granularity={50} />
      </EffectComposer>
    </>
  );
}

export default Scene;
