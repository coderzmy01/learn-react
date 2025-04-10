import { useState } from 'react';

function DateCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);
  const handleReset = () => {
    setCount(0);
    setStep(1);
  };
  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input type="text" value={count} onChange={(e) => setCount(Number(e.target.value))} />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      {count != 0 ? <button onClick={handleReset}>Reset</button> : null}
      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
    </div>
  );
}
export default DateCounter;
