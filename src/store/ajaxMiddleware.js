import axios from 'axios';
import shuffle from 'shuffle-array';
import {
  DATA_HOME_PAGE,
  CATEGORIES_QUIZZS,
  // QUIZZS_BY_ID,
  QUIZ_BY_WORLD_ID,
  DATA_HOME_GAME,
  QUESTION_BY_ID,
  receivedDataQuestions
} from './reducer';

const ajaxMiddleware = store => next => action => {
  switch (action.type) {
    case DATA_HOME_PAGE: // Requete qui récupère les données nécessaire pour la page home
      return axios
        .get('http://92.243.9.67/plateforme-educative-api/public/api/worlds')
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        });

    case DATA_HOME_GAME: // Requete qui récupère les données nécessaire pour la page home
      return axios
        .get(`http://92.243.9.67/plateforme-educative-api/public/api/worlds/${action.categoryId}/`)
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        });

    case CATEGORIES_QUIZZS: // Requete qui récupère les catégories pour les quizzs
      return axios
        .get(
          'http://92.243.9.67/plateforme-educative-api/public/api/categories'
        )
        .then(response => {
          next({
            ...action,
            data: response.data
          });
        });
    case QUIZ_BY_WORLD_ID:
      axios.get(`http://92.243.9.67/plateforme-educative-api/public/api/categories/${action.worldId}/quizzs`, {
        
      })
        .then((response) => {
          next({
            ...action,
            data: response.data,
          });
        })
        .catch((error) => {
          // console.log(error);
          
        });
      break;
    case QUESTION_BY_ID:
      next(action);
      return axios
        .get(
          `http://92.243.9.67/plateforme-educative-api/public/api/quizzs/${
            action.id
          }`
        )
        .then(response => {
          response.data.questions.map(data => shuffle(data.answers));
          store.dispatch(
            receivedDataQuestions(shuffle(response.data.questions))
          );
        });

    default:
      return next(action);
  }
};

export default ajaxMiddleware;
