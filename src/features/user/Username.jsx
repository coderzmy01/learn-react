import React from 'react';

import { useSelector } from 'react-redux';
export const UserName = () => {
  const userName = useSelector(
    (state) => state.user.userName,
  );
  return (
    userName && (
      <div className="text-sm text-white">{userName}</div>
    )
  );
};
