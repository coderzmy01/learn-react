import React from 'react';

const ReviewSelector = ({ text, children }) => {
  return (
    <div>
      <span className="key">{text}</span>
      {children}
    </div>
  );
};

export default ReviewSelector;
