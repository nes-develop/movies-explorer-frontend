import React from "react";
import { Link } from 'react-router-dom';
import useValidation from "../../hooks/useValidation";
import Form from '../Form/Form';
import './Register.css';
import '../Form/Form.css';

function Register(props) {
  const { values, handleChange, errors, isValid, /* setValues, resetForm */ } =
  useValidation({
    name: "",
    email: "",
    password: "",
  });

  return (
    <Form>
        <h2 className="form__title">Добро пожаловать!</h2>
        <label className="form__input-label">
          Имя
          <input
            className="form__input form__input_type_name"
            id="name"
            name="name"
            type="name"
            placeholder="Имя"
            autoComplete="name"
            minLength={4}
            required
            onChange={handleChange}
            value={values.name || ""}
          />
          <span
            className={`form__input-error name-error ${
              isValid ? "" : "form__input-error_visible"
            }`}
          >
            {errors.password}
          </span>
        </label>
        <label className="form__input-label">
          E-mail
          <input
            className="form__input form__input_type_email"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="username"
            minLength={4}
            required
            onChange={handleChange}
            value={values.email || ""}
          />
          <span
            className={`form__input-error email-error ${
              isValid ? "" : "form__input-error_visible"
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="form__input-label">
          Пароль
          <input
            className="form__input form__input_type_password"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            autoComplete="current-password"
            required
            onChange={handleChange}
            value={values.password || ""}
          />
          <span
            className={`form__input-error email-error ${
              isValid ? "" : "form__input-error_visible"
            }`}
          >
            {errors.password}
          </span>
        </label>
        <button
          className="form__button-submit"
          type="submit"
          //onClick={props.handleRegister}
        >
          Зарегистрироваться
        </button>
        <p className="form__redirect">
          Уже зарегистрированы?  
          <Link to='signin' className="form__redirect-link">
            Войти
          </Link>
        </p>
    </Form>
  );
}

export default Register;
