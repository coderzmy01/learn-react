import React from 'react';

const Friend = ({ friend, selectedFriend, onSelectFriend }) => {
  const selectedStyle = selectedFriend && selectedFriend.id === friend.id ? 'selected' : '';
  return (
    <li className={`${selectedStyle}`}>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name}欠你 ${friend.balance}
        </p>
      )}{' '}
      {friend.balance < 0 && (
        <p className="red">
          你欠{friend.name} ${friend.balance}
        </p>
      )}{' '}
      {friend.balance === 0 && <p>{friend.name}和你互不亏欠</p>}
      <button className="button" onClick={() => onSelectFriend(friend)}>
        {selectedStyle ? 'Close' : 'Select'}
      </button>
    </li>
  );
};

export default Friend;
