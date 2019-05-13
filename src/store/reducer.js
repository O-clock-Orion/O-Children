import { datas } from 'src/datas';
/**
 * Initial State
 */
const initialState = {
  datas,
  dataHomePage: [],
  userForm: {
    loggedIn: false,
    loading: false,
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    identifiant: '',
    birthday: ''
  },
  indexQuiz: 0,
  dataHomeGame: {},
  categoriesQuizzs: [],
  currentSlugCatAge: '',
  currrentSlugCatQuizzs: '',
  quizzsByWorldId: [],
  idCatAge: '',
  questionsOfQuiz: [],
  loaded: false,
  disabledButton: true,
  message: '',
  score: 0,
  myScore: false,
  answerTrue: false,
};

/**
 * Types
 */
export const DATA_HOME_PAGE = 'DATA_HOME_PAGE';
export const DATA_HOME_GAME = 'DATA_HOME_GAME';

// form
export const HANDLE_LOGIN_CHANGE = 'HANDLE_LOGIN_CHANGE';
export const ON_LOGIN_SUBMIT = 'ON_LOGIN_SUBMIT';
export const FORGOTTEN_SUBMIT = 'FORGOTTEN_SUBMIT';

// quiz
const INCREMENT_INDEX_QUIZ = 'INCREMENT_INDEX_QUIZ';
export const CATEGORIES_QUIZZS = 'CATEGORIES_QUIZZS';
const CURRENT_SLUG_CAT_AGE = 'CURRENT_SLUG_CAT_AGE';
const CURRENT_SLUG_CAT_QUIZZS = 'CURRENT_SLUG_CAT_QUIZZS';
export const QUESTION_BY_ID = 'QUESTION_BY_ID';
const RECEIVED_DATA_QUESTIONS = 'RECEIVED_DATA_QUESTIONS';
const CHOSEN_ANSWER = 'CHOSEN_ANSWER';
const UPDATE_SCORE = 'UPDATE_SCORE';
const GET_MESSAGE = 'GET_MESSAGE';
const MY_SCORE = 'MY_SCORE';
const INITIAL_QUIZ = 'INITIAL_QUIZ';
const ANSWER_IS_TRUE = 'ANSWER_IS_TRUE';
export const QUIZ_BY_WORLD_ID = 'QUIZ_BY_WORLD_ID';

/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DATA_HOME_PAGE:
      return {
        ...state,
        dataHomePage: [...action.data]
      };
    // form
    case HANDLE_LOGIN_CHANGE:
      return {
        ...state,
        userForm: {
          ...state.userForm,
          [action.name]: action.text
        }
      };
    case ON_LOGIN_SUBMIT:
      return {
        ...state,
        userForm: {
          ...state.userForm,
          loading: true
        }
      };
    case INCREMENT_INDEX_QUIZ:
      return {
        ...state,
        indexQuiz: state.indexQuiz + 1,
        disabledButton: true,
        message: '',
        answerTrue: false
      };
    case DATA_HOME_GAME:
      return {
        ...state,
        dataHomeGame: {...action.data}
      };
    case CATEGORIES_QUIZZS:
      return {
        ...state,
        categoriesQuizzs: [...action.data]
      };
    case CURRENT_SLUG_CAT_AGE:
      return {
        ...state,
        currentSlugCatAge: action.category,
        idCatAge: action.id
      };
    case CURRENT_SLUG_CAT_QUIZZS:
      return {
        ...state,
        currrentSlugCatQuizzs: action.slug
      };
    case QUIZ_BY_WORLD_ID:
      return {
        ...state,
        quizzsByWorldId: action.data
      };
    case QUESTION_BY_ID:
      return {
        ...state,
        loaded: false,
      };
    case RECEIVED_DATA_QUESTIONS:
      return {
        ...state,
        loaded: true,
        questionsOfQuiz: [
          ...action.data,
        ]
      };
    case CHOSEN_ANSWER:
      return {
        ...state,
        disabledButton: false
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: state.score + 1
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case MY_SCORE:
      return {
        ...state,
        myScore: true
      };
    case INITIAL_QUIZ:
      return {
        ...state,
        indexQuiz: 0,
        message: '',
        myScore: false,
        score: 0,
        disabledButton: true,
        answerTrue: false
      };
    case ANSWER_IS_TRUE:
      return {
        ...state,
        answerTrue: true
      };
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const handleLoginChange = (text, name) => ({
  type: HANDLE_LOGIN_CHANGE,
  text,
  name
});

export const onLoginSubmit = () => ({
  type: ON_LOGIN_SUBMIT
});

export const forgottenSubmit = () => ({
  type: FORGOTTEN_SUBMIT
});

export const getAllCategoriesQuizzs = () => ({
  type: CATEGORIES_QUIZZS
});

export const currentSlugCatQuizzs = slug => ({
  type: CURRENT_SLUG_CAT_QUIZZS,
  slug
});

export const dataForHomePage = () => ({
  type: DATA_HOME_PAGE
});

export const dataForHomeGame = categoryId => ({
  type: DATA_HOME_GAME,
  categoryId
});

export const getQuizByWorldId = worldId => ({
  type: QUIZ_BY_WORLD_ID,
  worldId,
})

export const getQuestionsByQuizId = id => ({
  type: QUESTION_BY_ID,
  id,
});

export const getMyScore = () => ({
  type: MY_SCORE
});

export const userChosenAnswer = () => ({
  type: CHOSEN_ANSWER
});

export const updateScore = () => ({
  type: UPDATE_SCORE
});

export const getMessage = message => ({
  type: GET_MESSAGE,
  message
});

export const messageScore = state => {
  const { score } = state;
  return score < 5 ? 'bad' : 'good';
};

export const answerIsTrue = () => ({
  type: ANSWER_IS_TRUE
});

export const handleClickButtonNext = () => ({
  type: INCREMENT_INDEX_QUIZ
});

export const initialQuiz = () => ({
  type: INITIAL_QUIZ
});

export const receivedDataQuestions = data => ({
  type: RECEIVED_DATA_QUESTIONS,
  data
});

export const infosCatAge = (category, id) => ({
  type: CURRENT_SLUG_CAT_AGE,
  category,
  id
});

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
