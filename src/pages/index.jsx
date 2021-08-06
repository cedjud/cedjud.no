import useStore from '@/helpers/store'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import dynamic from 'next/dynamic'

const Rose = dynamic(() => import('@/components/canvas/Rose/Rose'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })

  return (
    <>
      <OrbitControls r3f autoRotate />
      <Rose r3f />
      <EffectComposer r3f>
        <Bloom
          r3f
          intensity={4.0} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.9} // smoothness of the luminance threshold. Range is [0, 1]
        />
      </EffectComposer>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Jud',
    },
  }
}
