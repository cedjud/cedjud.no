import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'


const Triangles = dynamic(() => import('@/components/canvas/Triangles'), {
  ssr: false,
})

const Page = ({ title }) => {
  useStore.setState({ title })

  return (
    <>
      <Triangles r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'trekant',
    },
  }
}
