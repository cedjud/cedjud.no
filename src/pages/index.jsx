import useStore from '@/helpers/store'
import { OrbitControls } from '@react-three/drei' 
import dynamic from 'next/dynamic'

const Sphere = dynamic(() => import('@/components/canvas/Sphere/Sphere'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })
  
  return (
    <>
      <OrbitControls r3f />
      <pointLight r3f position={[10, 10, 10]} />
      <Sphere r3f route='/box' />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
