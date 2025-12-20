import Message from '../Message';
import Spinner from '../Spinner';
import CountryItem from './components/CountryItem';
import styles from './CountryList.module.css';

const CountryList = ({ cities, isLoading }) => {
  const countries = cities.reduce((acc, city) => {
    if (!acc.some((item) => item.country === city.country)) {
      return [...acc, { ...city }];
    }
    return acc;
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  if (countries.length === 0) {
    return <Message message="No countries found." />;
  }
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
