import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import axios from "../../../helpers/axios";

const Header = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogOut = async () => {
      await axios.get('/auth');
      logout();
      navigate( '/auth/login', {
        replace: true
      });
  }

  return (
    <header className={styles.header} >
    <ul className={ styles.ul } >

        <li className={ styles.liNavbar }>
        <NavLink
        className={ ({ isActive }) => isActive? styles.aActive : styles.aInactive }
        to="/home"
        >
        Home
        </NavLink>
        </li>

        <li className={ styles.liNavbar }>
        <NavLink 
        className={ ({ isActive }) => isActive? styles.aActive : styles.aInactive }
        to="/post"
        >
        Post
        </NavLink>
        </li>

        <li className={ styles.liNavbar }>
        <NavLink 
        className={ ({ isActive }) => isActive? styles.aActive : styles.aInactive }
        to="/profile"
        >
        Profile
        </NavLink>
        </li>

    </ul>

    <button id={ styles.logOut }
    onClick={ onLogOut }
    >
        Log out
    </button>
</header>
  )
}

export default Header
