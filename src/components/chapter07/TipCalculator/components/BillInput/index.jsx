import React from 'react';

const BillInput = ({ billNum, onChangeBillNum }) => {
  return (
    <div>
      <span>这个账单的花费?</span>
      <input
        type="number"
        value={billNum}
        onChange={(e) => onChangeBillNum(Number(e.target.value))}
      />
    </div>
  );
};

export default BillInput;
