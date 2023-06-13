import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className='about-me__title'>Алексей</h2>
      <div className='about-me__main'>
        <div className='about-me__info'>
          <h2 className='about-me__name'>Алексей</h2>
          <h3 className='about-me__job'>Фронтенд-разработчик, 34 года</h3>
          <p className='about-me__text'>Проживаю в Москве, закончил факультет "Стрела" в МАИ.
            Начал обучение год назад. Прошел большое количество курсов с
            Youtube. Люблю программирование, писать код и решать задачи.
            Планирую продолжить свое развитие в этой сфере.
            Помимо обучения работаю в команде по разработке API.</p>
          <a className='about-me__github' target="_blank" href='https://github.com/nes-develop'>Github</a>
        </div>
        <img className='about-me__photo' src={photo} alt="фото студента"></img>
      </div>

    </section>
  );
}

export default AboutMe;

