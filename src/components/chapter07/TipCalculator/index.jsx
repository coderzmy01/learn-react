import React from 'react';
import BillInput from './components/BillInput';
import ReviewSelector from './components/ReviewSelector';
const TipCalculator = () => {
  const [billNum, setBillNum] = React.useState(0);
  const [myreview, setMyReview] = React.useState(0);
  const [friendReview, setFriendReview] = React.useState(0);
  return (
    <div>
      <h1>Tip Calculator</h1>
      <BillInput billNum={billNum} onChangeBillNum={setBillNum} />
      {/* <ReviewSelector />
      <ReviewSelector />
      <TipDisplay />
      <RestButton /> */}
      <ReviewSelector text={'你咋样评价这份晚餐'}>
        <select
          value={myreview}
          onChange={(e) => {
            setMyReview(e.target.value);
          }}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </ReviewSelector>
      <ReviewSelector text={'你朋友咋样评价这份晚餐'}>
        <select
          value={friendReview}
          onChange={(e) => {
            setFriendReview(e.target.value);
          }}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </ReviewSelector>
      <div>
        <p>You should tip {((myreview + friendReview) / 2) * 0.05 * billNum.toFixed(2)}</p>
      </div>
      <button
        onClick={() => {
          setBillNum(0);
          setMyReview(0);
          setFriendReview(0);
        }}
      >
        reset
      </button>
    </div>
  );
};

export default TipCalculator;
