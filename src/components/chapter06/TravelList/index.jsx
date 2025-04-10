import React, { useState } from 'react';
import Form from './components/Form';
import Logo from './components/Logo';
import PackingList from './components/PackingList';
import Stats from './components/Stats';
const TravelList = () => {
  const [items, setItems] = useState([
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: false },
    { id: 3, description: 'Charger', quantity: 1, packed: false },
    { id: 4, description: 'Laptop', quantity: 1, packed: false },
    { id: 5, description: 'Headphones', quantity: 1, packed: false },
  ]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  const handleToggleItem = (id) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
    );
  };
  const handleClearList = () => {
    const confirmed = window.confirm('Are you sure you want to delete all items?');
    if (confirmed) setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

export default TravelList;
