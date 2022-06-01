import { useEffect, useState} from 'react';

import { SVGLoader } from 'three-stdlib';
const useSVGShapes = (svgPath) => {
  const [svgShape, setSvgShape] = useState();

  useEffect(() => {
    const loader = new SVGLoader();

    loader.load(
      '/img/triangle-group.svg',
      (data) => {
        const { paths } = data;
        const shapesArray = [];

        paths.forEach((path) => {
          const shapes = SVGLoader.createShapes(path);
          shapes.forEach((shape) => {
            shapesArray.push(shape);
          });
        });
        setSvgShape(shapesArray);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log('error : ', error);
      }
    );
  }, []);

  return svgShape;
};

export default useSVGShapes;
