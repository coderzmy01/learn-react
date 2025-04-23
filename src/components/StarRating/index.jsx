import React from 'react';
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};
const StarStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const StarRating = ({
  maxRating = 10,
  color = 'red',
  size = '1.5',
  className = '',
  message = [],
  onChange = () => {},
}) => {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const textStyle = {
    lineHeight: '1',
    color,
    fontSize: `${size}rem`,
  };
  const handleClick = (i) => {
    onChange(i + 1);
    setRating(i + 1);
  };
  return (
    <div style={containerStyle}>
      <div style={StarStyle} className={className}>
        {Array.from({ length: maxRating }, (el, i) => {
          return (
            <Star
              key={i}
              full={hover ? i < hover : i < rating}
              onRate={() => handleClick(i)}
              onHover={() => setHover(i + 1)}
              onLeave={() => setHover(0)}
              color={color}
              size={size}
            />
          );
        })}
      </div>
      <div style={textStyle}>
        {maxRating === message.length
          ? message[hover ? hover - 1 : rating - 1]
          : hover || rating || ''}
      </div>
    </div>
  );
};

const Star = ({ onRate, onHover, onLeave, full, color, size }) => {
  const itemStyle = {
    height: `${size}rem`,
    width: `${size}rem`,
    color: 'red',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };
  return (
    <span style={itemStyle} onClick={onRate} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {full ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
export default StarRating;
