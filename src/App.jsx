// src/App.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      {/* 导航栏 */}
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/">Tip Calculator</Link>
          </li>
          <li>
            <Link to="/travel-list">Travel List</Link>
          </li>
        </ul>
      </nav>

      {/* 路由内容出口 */}
      <Outlet />
    </div>
  );
};

export default App;
