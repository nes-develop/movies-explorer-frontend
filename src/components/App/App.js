import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  register,
  login,
  logout,
  getCards,
  getUser,
  changeUser,
  createSavedFilm,
  deleteSavedFilm,
} from "../../utils/MainApi";
import { getInitialCards } from "../../utils/MoviesApi";
import CurrentUserContext from "../../utils/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isQueryError, setIsQueryError] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [requestErrorText, setRequestErrorText] = useState('');
  const history = useHistory();
  const { pathname } = useLocation();
  

  //регистрация
  function handleRegister(name, email, password) {
    register(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRequestError(true);
        setRequestErrorText(err);
      });
  }

  //логин
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res);
          history.push("/movies");
          //localStorage.setItem('token', isLoggedIn);
          //console.log(localStorage.getItem('token'));
       }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRequestError(true);
        setRequestErrorText(err);
      });
      }

  // выход
  function handleLogout() {
    logout()
    .then((res) => {
      setIsLoggedIn(false);
      history.push("/");
      localStorage.removeItem('initialMovies');
      localStorage.removeItem('foundmovies');
      localStorage.removeItem('query');
      localStorage.removeItem('shortfilms');
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  }

  // изменения пользователя
  function handleChange(name, email) {
    changeUser(name, email)
      .then((res) => {
        setCurrentUser(res);
        setSuccessStatus(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRequestError(true);
        setRequestErrorText(err);
      });
  }

  // сохранение карточки в избранном
  function handleCardLike(card) {
    createSavedFilm(card)
      .then((newSavedFilm) => {
        setSavedMovies([newSavedFilm, ...savedMovies]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRequestError(true);
        setRequestErrorText(err);
      });
  }
  // удаление карточки из сохраненной
  function handleCardDeleteLike(card) {
    deleteSavedFilm(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsRequestError(true);
        setRequestErrorText(err);
      });
  }

  // получение первоначальных фильмов
  function getInitialMovies() {
    setIsLoading(true);
    getInitialCards()
      .then((data) => {
        localStorage.setItem("initialMovies", JSON.stringify(data));
      })
      .catch((err) => setIsQueryError(true))
      .finally(() => setIsLoading(false));
  }

  // уведомление успешного редактирования
  function setSuccessStatus() {
    setIsSuccess(true);
  }

  // исчезнование уведомления
  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  }, [isSuccess]);

  // однократная загрузка всех фильмов
  useEffect(() => {
    if (isLoggedIn) {
      getInitialMovies();
    }
  }, [isLoggedIn]);

  // установка сохраненных фильмов
  useEffect(() => {
      setIsLoading(true);
      getCards()
        .then((cards) => {
          setSavedMovies(cards);
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => setIsLoading(false));
  }, [isLoggedIn]);

  // установка первоночальных данных пользователя
  useEffect(() => {
    getUser()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        history.push(pathname);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }, [/*isLoggedIn,  history, pathname */]);

  useEffect(() => {
    setIsRequestError(false);
    setRequestErrorText('');
  }, [history, pathname]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/" exact>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>

          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register handleRegister={handleRegister} isRequestError={isRequestError} requestErrorText={requestErrorText}/>
            )}
          </Route>

          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login handleLogin={handleLogin} isRequestError={isRequestError} requestErrorText={requestErrorText}/> 
            )}
          </Route>

          <ProtectedRoute
            path="/movies"
            savedMovies={savedMovies}
            isLoggedIn={isLoggedIn}
            onCardDelete={handleCardDeleteLike}
            handleLikeClick={handleCardLike}
            component={Movies}
            isLoading={isLoading}
            isQueryError={isQueryError}
            isRequestError={isRequestError} 
            requestErrorText={requestErrorText}>
          </ProtectedRoute>

          <ProtectedRoute
            path="/saved-movies"
            savedMovies={savedMovies}
            isLoggedIn={isLoggedIn}
            onCardDelete={handleCardDeleteLike}
            component={SavedMovies}
            isLoading={isLoading}
            isRequestError={isRequestError} 
            requestErrorText={requestErrorText}
          ></ProtectedRoute>

          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            isSuccess={isSuccess}
            component={Profile}
            logout={handleLogout}
            handleChange={handleChange}
            isRequestError={isRequestError} 
            requestErrorText={requestErrorText}
          ></ProtectedRoute>

          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
