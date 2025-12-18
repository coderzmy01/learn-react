import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav';
import Logo from '../Logo';
import styles from './index.module.css';
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <span className={styles.copyright}>版权所有</span>
      </footer>
    </div>
  );
};

export default Sidebar;
