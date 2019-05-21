import axios from 'axios';
import shuffle from 'shuffle-array';

import {
  CATEGORIES_QUIZZS,
  QUIZ_BY_WORLD_ID,
  DATA_HOME_GAME,
  DATA_HOME_PAGE,
  QUESTION_BY_ID,
  receivedDataQuestions,
  getPage404,
  DATA_FOR_PUZZLES,
  SIGNUP_SUBMIT,
  LOGIN_SUBMIT,
  signedUp,
  signeUpError,
  loggedIn,
  loginError,
  DATA_FOR_PUZZLE
} from './reducer';

const ajaxMiddleware = store => next => action => {
  switch (action.type) {
    case DATA_HOME_PAGE: // Requete qui récupère les données nécessaire pour la page home
      return axios
        .get(`${process.env.API_URL}/api/worlds`)
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        });

    case DATA_HOME_GAME: // Requete qui récupère les données nécessaire pour la page home
      return axios
        .get(`${process.env.API_URL}/api/worlds/${action.categoryId}/`)
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case CATEGORIES_QUIZZS: // Requete qui récupère les catégories pour les quizzs
      return axios
        .get(`${process.env.API_URL}/api/categories`)
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        });
    case QUIZ_BY_WORLD_ID:
      return axios
        .get(
          `${process.env.API_URL}/api/categories/${action.worldId}/quizzs`,
          {}
        )
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case QUESTION_BY_ID:
      next(action);
      return axios
        .get(`${process.env.API_URL}/api/quizzs/${action.id}`, {})
        .then(response => {
          response.data.questions.map(data => shuffle(data.answers));

          store.dispatch(
            receivedDataQuestions(
              shuffle(response.data.questions),
              response.data.description,
              response.data.title
            )
          );
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case DATA_FOR_PUZZLES:
      return axios.get(`${process.env.API_URL}/api/worlds/${action.worldId}/puzzles`, {
        
      })
        .then((response) => {
          next({
            ...action,
            data: response.data[0].puzzles
          });
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case DATA_FOR_PUZZLE:
      return axios.get(`${process.env.API_URL}/api/puzzles/${action.puzzleId}/`, {
          
      })
        .then((response) => {
          // console.log(response.data);
          next({
            ...action,
            data: response.data,
          });
        })
        .catch((error) => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case LOGIN_SUBMIT:
      next(action);

      const {
        email: loginEmail,
        password: loginPassword
      } = store.getState().loginForm;

      const LoginObject = {
        username: loginEmail,
        password: loginPassword
      };

      return axios
        .post(`${process.env.API_URL}/api/login`, LoginObject)
        .then(({ data }) => store.dispatch(loggedIn(data.token)))
        .catch(() => store.dispatch(loginError()));

    case SIGNUP_SUBMIT:
      next(action);

      const {
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        username: signUpUsername,
        password: signUpPassword,
        confirmPassword: signUpConfirmPassword
      } = store.getState().registerForm;

      const signUpObject = {
        email: signUpEmail,
        firstName: `${signUpFirstName} ${signUpLastName}`,
        plainpassword: signUpPassword,
        plainpassword2: signUpConfirmPassword,
        username: signUpUsername
      };

      return axios
        .post(`${process.env.API_URL}/api/signup`, signUpObject)
        .then(() => store.dispatch(signedUp()))
        .catch(() => store.dispatch(signeUpError()));
    case ADD_OR_DELETE_FAV:
      return axios.get(`${process.env.API_URL}/api/puzzles/${action.puzzleId}/`, {
            
      })
        .then((response) => {
          // console.log(response.data);
          // next({
          //   ...action,
          //   data: response.data,
          // });
        })
        .catch((error) => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
