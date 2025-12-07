import { useReducer } from 'react';
function reducer(state, action) {
  if (action.type === 'inc') return { ...state, count: state.count + state.step };
  if (action.type === 'dec') return { ...state, count: state.count - state.step };
  if (action.type === 'setCount') return { ...state, count: action.payload };
  if (action.type === 'reset') return { ...state, count: 0, step: 1 };
  if (action.type === 'setStep') return { ...state, step: action.payload };
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="0" max="10" value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
