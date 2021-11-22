import { useEffect, useState } from 'react';

export default () => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      console.log('倒计时结束');
    }
  }, [counter]);

  const arrTest = () => {
    // debugger;
    const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
    const arr2 = ['A', 'B', 'C', 'D'];
    arr2.forEach((it, index) => {
      const i = (index + 1) * 2 + index;
      arr1.splice(i, 0, it);
    });
    console.log(arr1);
  };

  return (
    <div>
      {counter}
    </div>
  );
};
