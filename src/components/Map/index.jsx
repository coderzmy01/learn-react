import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';

const Map = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const latitude = urlSearchParams.get('latitude');
  const longitude = urlSearchParams.get('longitude');

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate('/app/form');
      }}
    >
      这是一个地图
      <div>
        纬度：{latitude}
        经度：{longitude}
      </div>
      <button onClick={() => setUrlSearchParams({})}>返回</button>
    </div>
  );
};

export default Map;
