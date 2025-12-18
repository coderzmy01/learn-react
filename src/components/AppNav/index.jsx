import { NavLink } from 'react-router-dom';
import styles from './index.module.css';
const AppNav = () => {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">城市</NavLink>
        </li>
        <li>
          <NavLink to="counties">国家</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AppNav;
