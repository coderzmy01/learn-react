import { useEffect, useState } from 'react';
const Demo2 = () => {
  const [count, setCount] = useState(0);

  // 每次 count 变化时设置一个定时器
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`Timeout count: ${count}`);
    }, 3000);

    // 清理上一次的定时器
    return () => clearTimeout(timer);
  }, [count]);

  const handleClick = () => {
    // 快速点击按钮多次，会发现打印出的是点击前的 count 值
    setTimeout(() => {
      console.log('Click count:', count); // 这里的 count 是点击时的值，不是最新的
    }, 1000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleClick}>Log Count After Delay</button>
    </div>
  );
};

export default Demo2;
