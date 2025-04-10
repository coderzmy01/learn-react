// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-gray-400 mb-6">404</h1>
      <div className="text-3xl font-bold mb-4 text-gray-800">页面未找到！</div>
      <p className="text-lg text-gray-600 mb-8">看起来你访问的页面不存在。</p>
      <Link
        to="/"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;
