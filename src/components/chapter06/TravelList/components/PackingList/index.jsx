import React from 'react';

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
  const [sort, setSort] = React.useState('SORT_ALPHABETICAL');
  let sortedItems;
  if (sort === 'SORT_ALPHABETICAL') {
    sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
  } else if (sort === 'SORT_PACKED') {
    sortedItems = [...items].sort((a, b) => Number(b.packed) - Number(a.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="SORT_ALPHABETICAL">Sort Alphabetically</option>
          <option value="SORT_PACKED">Sort Packed/Not Packed</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
};

export default PackingList;
