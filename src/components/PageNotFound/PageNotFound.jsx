import React from 'react';
import './PageNotFound.css'
import {Link} from "react-router-dom";

const PageNotFound = () => {
	return (
		<div className='page-not-found'>
			<div className='page-not-found__container'>
				<h2 className='page-not-found__title'>404</h2>
				<p className='page-not-found__text'>Страница не найдена</p>
				<Link className='page-not-found__link' to={-1}>
					Назад
				</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
