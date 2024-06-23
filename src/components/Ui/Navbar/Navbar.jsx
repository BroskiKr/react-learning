import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';
import MyButton from '../button/MyButton';
import { useContext } from 'react';
import { AuthContext } from '../../../context';

const Navbar = (props) => {
  const { isAuth, setIsAuth, setToken } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    setToken('')
    localStorage.removeItem('access_token')
    localStorage.removeItem('currentPath')
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__links}>
        <Link className={styles.navbar__link} to=''>Home</Link>
        <Link className={styles.navbar__link} to='/about'>Про нас</Link>
        <Link className={styles.navbar__link} to='/posts'>Список постів</Link>
        <Link className={styles.navbar__link} to='/users'>Список користувачів</Link>
      </div>
      {isAuth && <MyButton onClick={logout}>
        Вийти
      </MyButton>}
    </div>
  );
}

export default Navbar;