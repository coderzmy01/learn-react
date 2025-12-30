import { createContext, useContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case 'city/added':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        currentCity: null,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case 'city/loaded':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
};
const CitiesProvider = ({ children }) => {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState(null);
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch('http://localhost:3001/cities');
        const data = await res.json();
        const cities = data.map((city) => ({
          ...city,
          lat: city.position.lat,
          lng: city.position.lng,
        }));
        dispatch({ type: 'cities/loaded', payload: cities });
      } catch (error) {
        dispatch({ type: 'error', payload: error });
      }
    })();
  }, []);
  const loadCity = async (id) => {
    if (currentCity && currentCity.id === id) {
      return;
    }
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`http://localhost:3001/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    }
  };
  const addCity = async (city) => {
    try {
      const res = await fetch('http://localhost:3001/cities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: 'city/added', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    }
  };
  // 删除
  const deleteCity = async (id) => {
    try {
      await fetch(`http://localhost:3001/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    }
  };
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, loadCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
export { CitiesProvider, useCities };
