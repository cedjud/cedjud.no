import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import { shaderMaterial } from '@react-three/drei'

import vertex from './shaders/shader.vs';
import fragment from './shaders/shader.fs';

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
    // wireframe: true,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  },
  vertex,
  fragment
)

extend({ ColorShiftMaterial })

const Rose = (props) => {
  const mesh = useRef(false)

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime()
    mesh.current.material.uniforms.time.value = elapsedTime / 2

    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.001
    }
  })

  return (
    <mesh
      ref={mesh}
      {...props}
      position={[0, 0, -1]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[1.5, 256, 256]} />
      <colorShiftMaterial attach='material' time={3} />
    </mesh>
  )
}

export default Rose
