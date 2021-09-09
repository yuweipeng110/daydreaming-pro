import LazyLoad from 'react-lazyload';
import { useEffect, useState } from 'react';
import Placeholder from './compoents/Placeholder';

export default () => {
  const uniqueId = () => {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
  };
  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr(Array.apply(null, Array(30)).map((a, index) => {
      return {
        uniqueId: uniqueId(),
        // once: [6, 7].indexOf(index) > -1,
        once: false,
      };
    }));
  },[])

  return (
    <>
      {
        arr.map((item,index) => {
          return (
            <LazyLoad once={false} key={index} placeholder={<Placeholder />} debounce={50}>
            </LazyLoad>
          )
        })
      }
    </>
  );
};
