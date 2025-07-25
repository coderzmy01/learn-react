// useLayoutEffect的基本使用
import { useEffect, useLayoutEffect, useState } from 'react';
export default function Demo() {
  console.log('render');
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    // console.log('useLayoutEffect');
    if (count === 0) {
      setCount(1);
      //   console.log(document.getElementById('demo'), 'useLayoutEffect');
    }
  }, [count]);
  useEffect(() => {
    // console.log('useLayoutEffect');
    // console.log(document.getElementById('demo'), 'useEffect');
    if (count === 0) {
      setCount(1);
    }
  }, [count]);
  return (
    <div
      //   style={{
      //     width: 200,
      //     height: 200,
      //     backgroundColor: `${count ? 'red' : 'green'}`,
      //   }}
      id="demo"
      className={'h-20 container mx-auto' + ' ' + (count === 0 ? 'bg-red-200' : 'bg-green-500')}
      onClick={() => {
        setCount(0);
      }}
    >
      useLayoutEffect
    </div>
  );
}
