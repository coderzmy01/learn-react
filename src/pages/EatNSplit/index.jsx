import React, { useState } from 'react';
import FormBillSplit from './components/FormBillSpilt';
import FriendAdd from './components/FriendAdd';
import FriendList from './components/FriendsList';
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const EatNSplit = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const handelAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };
  const handleSelectFriend = (friend) => {
    console.log(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };
  const handelBillSplit = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend,
      ),
    );
    setSelectedFriend(null);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FriendAdd onAddFriend={handelAddFriend} />}
        <button
          className="button"
          onClick={() => {
            console.log('clicked');
            setShowAddFriend((show) => !show);
          }}
        >
          {showAddFriend ? 'Close' : 'Add Friend'}
        </button>
      </div>
      {selectedFriend && (
        <FormBillSplit selectedFriend={selectedFriend} onBillSplit={handelBillSplit} />
      )}
    </div>
  );
};

export default EatNSplit;
