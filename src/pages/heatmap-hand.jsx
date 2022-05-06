import useStore from '@/helpers/store'
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import dynamic from 'next/dynamic'


const HeatMapNoise = dynamic(() => import('@/components/canvas/HeatMapHand'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  // const state = useThree();

  // console.log(state);

  return (
    <>
      <HeatMapNoise r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: '✨',
    },
  }
}
