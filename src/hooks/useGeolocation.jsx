import { useState } from 'react';

export const useGeolocation = (defaultPosition) => {
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getPosition = () => {
    // 检查浏览器是否支持 geolocation API
    if (!navigator.geolocation) {
      console.log('浏览器不支持 geolocation API');
      setError('浏览器不支持 geolocation API');
      return;
    }
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos);
          setPosition({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.log(err);
          setError(err.message);
          setLoading(false);
        },
      );
    }
  };
  return { position, error, loading, getPosition };
};
