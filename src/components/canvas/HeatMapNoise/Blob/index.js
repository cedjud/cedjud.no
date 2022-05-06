import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshWobbleMaterial,
  MeshDistortMaterial,
} from "@react-three/drei";
import SimplexNoise from "simplex-noise";
import lerp from "lerp";


function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function Scene({}) {
  const noiseRef = useRef(null);
  const lightRef1 = useRef();
  const lightRef2 = useRef();
  const meshRef = useRef();

  useEffect(() => {
    const simplex = new SimplexNoise();
    noiseRef.current = simplex;
  }, []);

  useFrame(({ clock, mouse }) => {
    const elapsedTime = clock.elapsedTime;
    if (meshRef.current && noiseRef.current) {
      const noiseValueX = noiseRef.current.noise2D(elapsedTime * 0.1, 1);
      const noiseValueY = noiseRef.current.noise2D(elapsedTime * 0.2, 1);

      meshRef.current.position.x = scale(noiseValueX, -1, 1, -3, 3);
      meshRef.current.position.y = scale(noiseValueY, -1, 1, -3, 3);

      meshRef.current.scale.x = scale(noiseValueX, -1, 1, 1, 3);
      meshRef.current.scale.y = scale(noiseValueY, -1, 1, 1, 3);
    }
  });

  return (
    <>
      <ambientLight />

			<pointLight ref={lightRef1} args={["yellow", 1, 100]} position={[2, 0, 2]}/>
			<pointLight ref={lightRef2} args={["yellow", 1, 100]} position={[-2, 0, 2]}/>

			<mesh ref={meshRef}>
				<sphereGeometry />
				<MeshDistortMaterial factor={100} speed={5} color="red" />
			</mesh>
    </>
  );
}

export default Scene;
