import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import styles from './PageNav.module.css';
const PageNav = () => {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="product">产品</NavLink>
        </li>{' '}
        <li>
          <NavLink to="pricing">定价</NavLink>
        </li>{' '}
        <li>
          <NavLink to="login">登陆</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default PageNav;
