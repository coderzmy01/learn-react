import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="border-b border-b-stone-600 bg-stone-700 px-4 py-3">
      <Link
        to="/menu"
        className="tracking-widest text-white"
      >
        菜单
      </Link>
    </header>
  );
};
export default Header;
