import React from 'react';
import './AboutMe.css'
import student_image from '../../../images/student_image.jpg'

const AboutMe = () => {
	return (
		<section className='about-me' id='student'>
			<div className="about-me__container">
				<h2 className="about-me__title">Студент</h2>
				<div className="about-me__block">
					<div className="about-me__info">
						<h3 className="about-me__student">Алексей</h3>
						<p className="about-me__profession">Фронтенд-разработчик, 34 года</p>
						<p className="about-me__description">Проживаю в Москве, закончил факультет "Стрела" в МАИ.
							Начал обучение год назад. Прошел большое количество курсов с
							Youtube. Люблю программирование, писать код и решать задачи. 
							Планирую продолжить свое развитие в этой сфере.
							Помимо обучения работаю в команде по разработке API.</p>

						<a href="https://github.com/nes-develop" target='_blank' className="about-me__link">Github</a>

					</div>


					<img src={student_image} alt="фото профиля" className="about-me__image"/>
				</div>

			</div>

		</section>
	);
};

export default AboutMe;
