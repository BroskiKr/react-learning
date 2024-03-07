import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';

const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
      <Link className={styles.navbar__link} to=''>Home</Link>
      <Link className={styles.navbar__link} to='/about'>Про нас</Link>
      <Link className={styles.navbar__link} to='/posts'>Список постів</Link>
    </div>
  );
}

export default Navbar;