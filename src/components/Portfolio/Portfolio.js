import React from 'react';
import './Portfolio.css';
import pointer from '../../images/pointer.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <nav className='portfolio__menu'>
        <h4 className='portfolio__title'>Портфолио</h4>
        {/* проблема с gh pages, дублирую чтобы не было 404*/}
        <a className='portfolio__menu-item' target="_blank" href='https://nes-develop.github.io/russian-travel/'>
          <p className='portfolio__menu-item-text'>Статичный сайт</p>
          <img className='portfolio__menu-item-picture' src={pointer} alt='стрелка'></img>
        </a>
        <a className='portfolio__menu-item' target="_blank" href='https://nes-develop.github.io/russian-travel/'>
          <p className='portfolio__menu-item-text'>Адаптивный сайт</p>
          <img className='portfolio__menu-item-picture' src={pointer} alt='стрелка'></img>
        </a>
        <a className='portfolio__menu-item' target="_blank" href='https://nes-develop.github.io/mesto/'>
          <p className='portfolio__menu-item-text'> Одностраничное приложение</p>
          <img className='portfolio__menu-item-picture' src={pointer} alt='стрелка'></img>
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;