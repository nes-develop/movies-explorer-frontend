import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className='footer__container'>
        <p className="footer__copyright">&copy; 2023</p>
        <nav className='footer__link'>
          <a className='footer__link-item' target="_blank" href='https://practicum.yandex.ru/'>Яндекс Практикум</a>
          <a className='footer__link-item' target="_blank" href='https://github.com/nes-develop'>GitHub</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;