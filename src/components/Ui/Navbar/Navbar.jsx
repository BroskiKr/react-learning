import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <div className="navbar">
      <Link className="navbar__link" to='/about'>Про нас</Link>
      <Link className="navbar__link" to='/posts'>Список користувачів</Link>
    </div>
  );
}

export default Navbar;