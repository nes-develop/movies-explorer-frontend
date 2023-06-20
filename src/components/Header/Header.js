import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo-form.svg';
import account from '../../images/account.svg';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const [isClicked, setIsClicked] = useState(false);

  function handleMenuOpen() {
    setIsClicked(true);
  }

  function handleMenuClose() {
    setIsClicked(false);
  }

  return (
    <>  
      {!props.isLoggedIn ? (
          <header className="header">
            <Link to="/" className='header__logo'><img alt="логотип проекта" src={logo}></img></Link>
            <nav className='header__nav'>
              <Link to="/signup" className='header__nav-item'>Регистрация</Link>
              <Link to="/signin" className='header__nav-item'>Войти</Link>
            </nav> 
          </header>
        ) : (
          <header className='header'>
            <Link to="/" className='header__logo'><img alt="логотип проекта" src={logo}></img></Link>
            <nav className='header__menu'>
              <Link to='/movies' className='header__menu-item'>Фильмы</Link>
              <Link to='/saved-movies' className='header__menu-item'>Сохраненные фильмы</Link>
            </nav> 
            <Link to='/profile' className='header__account'>
              <img alt='переход в аккаунт' src={account} className='header__account-picture'></img>
            </Link>
            <button onClick={handleMenuOpen} className="header__menu-button"></button>
            {isClicked ? <Navigation handleClose={handleMenuClose} /> : ''}
          </header>
        )}
      </>
  );
}

export default Header;