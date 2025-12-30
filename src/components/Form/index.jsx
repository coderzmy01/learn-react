// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../../context/CitiesContext';
import { usePositionState } from '../../hooks/usePositionState';
import BackTo from '../BackTo';
import Button from '../Button';
import Message from '../Message';
import Spinner from '../Spinner';
import styles from './Form.module.css';
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { latitude, longitude } = usePositionState();
  const { isLoading: FormLoading, error: FormError, addCity } = useCities();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emoji = convertToEmoji(country);
  const handleSubmit = (e) => {
    addCity({
      cityName,
      country,
      emoji: emoji,
      date,
      notes,
      id: Date.now(),
      
      position: { lat: +latitude, lng: +longitude },
    });
    navigate('/app/cities');
  };
  useEffect(() => {
    if (latitude && longitude) {
      setIsLoading(true);
      setError(null);
      fetch(`${BASE_URL}?latitude=${latitude}&longitude=${longitude}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.countryCode) {
            throw new Error('这个地点没有国家');
          }
          setCityName(data.city || data.locality || '');
          setCountry(data.countryCode || '');
        })
        .catch(() => {
          setError('这个地点没有国家');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [latitude, longitude]);
  if (!latitude || !longitude) return <Message message="请允许获取位置" />;
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form className={`${styles.form} ${FormLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input id="date" onChange={(e) => setDate(e.target.value)} value={date} /> */}
        <DatePicker selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit}>Add</Button>
        <BackTo />
      </div>
    </form>
  );
}

export default Form;
