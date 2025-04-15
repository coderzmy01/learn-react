import React, { useState } from 'react';
const FormBillSplit = ({ selectedFriend, onBillSplit }) => {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('user');
  const paidByFriend = bill ? bill - paidByUser : '';
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) {
      return;
    }
    const bonus = whoIsPaying === 'user' ? paidByUser : -paidByFriend;
    onBillSplit(bonus);
  };
  return (
    <form action="" className="form-split-bill" onSubmit={handelSubmit}>
      <h2>和{`${selectedFriend.name}`}分享账单</h2>
      <label htmlFor="">账单总账</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label htmlFor="">{selectedFriend.name}的账单</label>
      <input type="text" value={paidByFriend} disabled />
      <label htmlFor="">我的账单</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => {
          setPaidByUser((paidByUser) =>
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value),
          );
        }}
      />
      <label htmlFor="">谁来付账单</label>
      <select name="" id="" value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">你</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button">分享账单</button>
    </form>
  );
};

export default FormBillSplit;
