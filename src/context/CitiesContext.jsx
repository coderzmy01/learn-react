import { createContext, useContext, useEffect, useState } from 'react';

const CitiesContext = createContext();
const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
};
const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const res = await fetch('http://localhost:3001/cities');
        const data = await res.json();
        const cities = data.map((city) => ({
          ...city,
          lat: city.position.lat,
          lng: city.position.lng,
        }));
        setCities(cities);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const loadCity = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CitiesContext.Provider value={{ cities, setCities, isLoading, currentCity, loadCity }}>
      {children}
    </CitiesContext.Provider>
  );
};
export { CitiesProvider, useCities };
