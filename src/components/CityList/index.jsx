import Message from '../Message';
import Spinner from '../Spinner';
import CityItem from './CityItem';
import styles from './CityList.module.css';

const CityList = ({ cities, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (cities.length === 0) {
    return <Message message="No cities found." />;
  }
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
};

export default CityList;
