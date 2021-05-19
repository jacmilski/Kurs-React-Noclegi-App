import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './menu.module.css';


function Menu() {

  //const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [auth, setAuth] = useAuth();

  const changeLogout = (e) => {
    e.preventDefault();
    //logout();
    setAuth(false);
  }

  return (
    <div className={`${styles.menuContainer} breadcrumb`}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink exact to='/' activeClassName={styles.menuItemActive}>Home</NavLink>
        </li>
          {auth   //isAuthenticated 
            ? <>
                <li className={styles.menuItem}>
                    <NavLink to='/profil' activeClassName={styles.menuItemActive}>Mój profil</NavLink>
                </li>
                <li className={styles.menuItem}>
                  <a href='https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md' onClick={changeLogout}>
                    Wyloguj
                  </a>
                </li>
              </>
            : (
              <>
                <li className={styles.menuItem}>
                  <NavLink 
                        to='/rejestracja' 
                        activeClassName={styles.menuItem}
                  >
                    Zarejestruj
                  </NavLink>
                </li>
                <NavLink to='/zaloguj' className={styles.menuItem} activeClassName={styles.menuItemActive}>
                  <a href='https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md'>
                    Zaloguj
                  </a>
                </NavLink>
              </>
            )
          }
      </ul>
    </div>
  );
}

export default Menu;