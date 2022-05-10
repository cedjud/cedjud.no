import useStore from '@/helpers/store';
import dynamic from 'next/dynamic';

const HeatMapNoise = dynamic(() => import('@/components/canvas/HeatMapHand'), {
  ssr: false,
});

const Page = ({ title }) => {
  useStore.setState({ title });

  return (
    <>
      <HeatMapNoise r3f />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'heatmap hand',
    },
  };
}
