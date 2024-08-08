import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import UserMenu from '../../UserMenu/UserMenu';

const Navbar = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__links}>
        <Link className={styles.navbar__link} to=''>Home</Link>
        <Link className={styles.navbar__link} to='/about'>Про нас</Link>
        <Link className={styles.navbar__link} to='/posts'>Список постів</Link>
        <Link className={styles.navbar__link} to='/users'>Список користувачів</Link>
      </div>
      {isAuth && <UserMenu />}
    </div>
  );
}

export default Navbar;