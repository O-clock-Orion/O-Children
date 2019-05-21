import axios from 'axios';
import shuffle from 'shuffle-array';
import jwt from 'jsonwebtoken';

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
  DATA_FOR_PUZZLE,
  GET_USER_INFOS,
  TOGGLE_FAVORIS,
} from './reducer';

const ajaxMiddleware = store => next => action => {
  switch (action.type) {
    case DATA_HOME_PAGE: // Requete qui récupère les données nécessaire pour la page home
      return axios.get(`${process.env.API_URL}/api/worlds`).then(response => {
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

          const data = response.data.map(dataQuizzes => {
            return {
              ...dataQuizzes,
              favoris: false,
            }
          });
          next({
            ...action,
            data,
          });
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case TOGGLE_FAVORIS:
      // console.log(store.getState().loggedUserInfos.token);
      axios.post(`${process.env.API_URL}/api/users/${store.getState().loggedUserInfos.userId}/bookmarks/quizzs/${action.quizId}/toggle`, {
        headers: {
          Authorization: `Bearer ${store.getState().loggedUserInfos.token}`,
        },
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          
        });
      break;
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
      return axios
        .get(`${process.env.API_URL}/api/worlds/${action.worldId}/puzzles`, {})
        .then(response => {
          next({
            ...action,
            data: response.data[0].puzzles
          });
        })
        .catch(error => {
          if (error.response.status === 404) store.dispatch(getPage404());
        });
    case DATA_FOR_PUZZLE:
      return axios
        .get(`${process.env.API_URL}/api/puzzles/${action.puzzleId}/`, {})
        .then(response => {
          // console.log(response.data);
          next({
            ...action,
            data: response.data
          });
        })
        .catch(error => {
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
        .then(({ data }) => {
          const { userId } = jwt.decode(data.token);
          store.dispatch(loggedIn({ token: data.token, userId }));
        })
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

    case GET_USER_INFOS:
      if (!store.getState().loggedIn) return store.dispatch(getPage404());
      return axios
        .get(
          `${process.env.API_URL}/api/users/${
            store.getState().loggedUserInfos.userId
          }`,
          {
            headers: {
              Authorization: `bearer ${store.getState().loggedUserInfos.token}`
            }
          }
        )
        .then(console.log);

    default:
      return next(action);
  }
};

export default ajaxMiddleware;
