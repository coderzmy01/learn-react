import { Link } from 'react-router-dom';
import { useCities } from '../../../context/CitiesContext';
import styles from './CityItem.module.css';
const TimeFormat = ({ date }) => {
  const d = new Date(date);
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  return `${Y}年${M}月${D}日`;
};
const CityItem = ({ city }) => {
  const { currentCity } = useCities();
  const {
    id,
    cityName,
    emoji,
    date,
    position: { lat, lng },
  } = city;
  return (
    <Link to={`${id}?latitude=${lat}&longitude=${lng}`}>
      <div
        className={`${styles.cityItem} ${currentCity?.id === id ? styles['cityItem--active'] : ''}`}
      >
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.name}>{cityName}</div>
        <div className={styles.date}>{TimeFormat({ date })}</div>
        <button className={styles.deleteBtn}> &times;</button>
      </div>
    </Link>
  );
};

export default CityItem;
