import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { a, useSpring } from '@react-spring/three'
import { useEffect, useRef, useState } from 'react'
import useStore from '@/helpers/store'
import { shaderMaterial } from '@react-three/drei'

import vertex from './shaders/plane.vs'
import fragment from './shaders/plane.fs'

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
    // wireframe: true,
    transparent: true,
    side: THREE.DoubleSide
  },
  vertex,
  fragment,
)

extend({ ColorShiftMaterial })

const TestShader = (props) => {
  const mesh = useRef(false)
  const [hovered, setHover] = useState(false)

  const router = useStore((state) => state.router)

  const { scale } = useSpring({ scale: hovered ? 7 : 5, from: { scale: 5 } })

  useEffect(() => {
    console.log(mesh.current.material.pro);
  });

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    mesh.current.material.uniforms.time.value = elapsedTime;

    // console.log(elapsedTime);
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.001
    }

    // if (mesh.current.material) {
    //   mesh.current.material.uniforms.time.value +=
    //     Math.sin(delta / 2) * Math.cos(delta / 2)
    // }
  })


  return (
    <mesh
      ref={mesh}
      // scale={scale.to((s) => [s, s, s])}
      // onClick={() => {
      //   console.log('clicked')
      // }}
      // onPointerOver={(e) => setHover(true)}
      // onPointerOut={(e) => setHover(false)}
      {...props}
    >
      {/* <boxBufferGeometry args={[0.5, 0.5, 0.5]} /> */}
      <sphereGeometry args={[1.5, 128, 128]} />
      <colorShiftMaterial attach='material' time={3} />
    </mesh>
  )
}

export default TestShader
