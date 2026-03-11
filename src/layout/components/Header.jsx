import React from 'react';
import { Link } from 'react-router-dom';
import { UserName } from '../../features/user/Username';
import SearchOrder from '../../features/order/SearchOrder';
const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-b-stone-600 bg-stone-700 px-4 py-3">
      <Link
        to="/menu"
        className="tracking-widest text-white"
      >
        菜单
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
};
export default Header;
