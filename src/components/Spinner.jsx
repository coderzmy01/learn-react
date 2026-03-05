import React from 'react';

export const Spinner = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-slate-200/30 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
};
