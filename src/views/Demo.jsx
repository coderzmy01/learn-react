import { useState } from 'react';
const Demo = () => {
  console.log('Demo');
  const [count, setCount] = useState(10);
  const handleClick = () => {
    for (let i = 0; i < 10; i++) {
      setCount(count + 1);
    }
  };
  return <div onClick={handleClick}>{count}</div>;
};

export default Demo;
