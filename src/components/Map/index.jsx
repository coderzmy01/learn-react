import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useGeolocation } from '../../hooks/useGeolocation';
import { usePositionState } from '../../hooks/usePositionState';

import { useNavigate } from 'react-router-dom';
import { useCities } from '../../context/CitiesContext';
import Button from '../Button';
import styles from './index.module.css';
// 组件用于改变地图位置
const ChangeMapPosition = ({ position }) => {
  const map = useMap();
  map.setView(position);
};
// 获取点击的地图位置
const GetMapPosition = ({ setTempMarker, tempMarker }) => {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: (e) => {
      // 记录点击位置并在地图上打点
      setTempMarker({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
      // 跳转表单，并携带当前点击的位置
      navigate(`form?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`);
    },
  });
  return tempMarker && <Marker position={[tempMarker.latitude, tempMarker.longitude]} />;
};
const Map = () => {
  const { cities } = useCities();
  const { position, loading, getPosition } = useGeolocation();
  const { latitude, longitude } = usePositionState([0, 0]);

  const [mapPosition, setMapPosition] = useState([latitude, longitude]);
  const [tempMarker, setTempMarker] = useState(null);
  // 当 latitude 和 longitude 变化时，更新地图位置
  useEffect(() => {
    if (latitude && longitude) {
      setMapPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);
  useEffect(() => {
    if (position) {
      console.log(position);
      setTempMarker({ latitude: position.latitude, longitude: position.longitude });
      setMapPosition([position.latitude, position.longitude]);
    }
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button onClick={getPosition} type="position">
          {loading ? '获取中...' : '获取位置'}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
        <GetMapPosition setTempMarker={setTempMarker} tempMarker={tempMarker} />
      </MapContainer>
    </div>
  );
};

export default Map;
