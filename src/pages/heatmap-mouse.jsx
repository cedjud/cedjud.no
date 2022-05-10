import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

const HeatMapMouse = dynamic(() => import('@/components/canvas/HeatMapMouse'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })

  return (
    <>
      <HeatMapMouse r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'heatmap mouse',
    },
  }
}
