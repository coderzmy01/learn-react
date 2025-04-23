// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './components/StarRating';
// import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      color="blue"
      size="2"
      message={['terrible', 'bad', 'ok', 'good', 'great']}
    />
    <StarRating maxRating={5} color="orange" />
  </React.StrictMode>,
);
