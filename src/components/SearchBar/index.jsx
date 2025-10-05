import { useRef } from 'react';
import { useKeys } from '../../hooks/useKeys';
const SearchBar = ({ movies, query, onChange }) => {
  const inputRef = useRef(null);
  // 使用useEffect来监听键盘事件，如果按下Enter键，则将输入框聚焦，并清空输入框
  useKeys('Enter', () => {
    inputRef.current.focus();
    if (document.activeElement !== inputRef.current) {
      onChange('');
    }
  });
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
};

export default SearchBar;
