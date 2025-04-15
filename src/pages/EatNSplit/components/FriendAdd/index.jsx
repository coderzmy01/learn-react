import React, { useState } from 'react';

const FriendAdd = ({ onAddFriend }) => {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    onAddFriend({
      id: Math.random(),
      name,
      image: `${image}?=${crypto.randomUUID()}`,
      balance: 0,
    });
    console.log(name, image);
  };
  return (
    <form className="form-add-friend" onSubmit={handelSubmit}>
      <label htmlFor="">💽姓名：</label>
      <input
        type="text"
        placeholder="Add a friend"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">🕹️头像地址：</label>
      <input
        type="text"
        placeholder="添加头像"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button">+ Add</button>
    </form>
  );
};

export default FriendAdd;
