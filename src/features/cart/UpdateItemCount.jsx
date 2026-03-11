import React from 'react';
import Button from '../../components/Button';

export const UpdateItemCount = ({
  count,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button type="small" onClick={onDecrement}>
        -
      </Button>
      <p className="text-sm font-bold">{count}</p>
      <Button type="small" onClick={onIncrement}>
        +
      </Button>
    </div>
  );
};
