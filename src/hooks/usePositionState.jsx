import { useSearchParams } from 'react-router-dom';
export const usePositionState = () => {
  const [urlSearchParams] = useSearchParams();
  const latitude = urlSearchParams.get('latitude') || 0;
  const longitude = urlSearchParams.get('longitude') || 0;
  return { latitude, longitude };
};
