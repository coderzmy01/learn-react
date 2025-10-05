import { useEffect, useState } from 'react';
export const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(window.localStorage.getItem('countClicks') || 0);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  const getPosition = () => {
    setCountClicks((count) => +count + 1);

    if (!navigator.geolocation) return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  };
  useEffect(() => {
    window.localStorage.setItem('countClicks', countClicks);
  }, [countClicks]);
  return { isLoading, error, position, countClicks, getPosition };
};
