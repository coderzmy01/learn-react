import Map from '../../components/Map';
import Sidebar from '../../components/Sidebar';
import styles from './index.module.css';
const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
