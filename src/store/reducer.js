import memory from 'src/datas';
import shuffle from 'shuffle-array';

/**
 * Initial State
 */
const initialState = {
  dataHomePage: [],
  puzzles: [],
  puzzle: {},
  dataMemory: [...JSON.parse(JSON.stringify(memory))],
  loginForm: {
    email: '',
    password: '',
    loading: false,
    loggedIn: false,
    error: false
  },
  registerForm: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    loading: false,
    signedUp: false,
    error: false
  },
  loggedIn: false,
  loggedUserInfos: {},
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
  error404: false,
  getCountPaire: 0,
  getCountClick: 0,
  getTentative: 0,
  finished: false,
  openedCard: [],
  descriptionCurrentQuiz: '',
  currentNameQuiz: ''
};

/**
 * Types
 */
export const DATA_HOME_PAGE = 'DATA_HOME_PAGE';
export const DATA_HOME_GAME = 'DATA_HOME_GAME';

// login
const HANDLE_LOGIN_CHANGE = 'HANDLE_LOGIN_CHANGE';
export const LOGIN_SUBMIT = 'ON_LOGIN_SUBMIT';
const LOGIN_RESET = 'LOGIN_RESET';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGGED_IN = 'LOGGED_IN';

// forgotten
export const FORGOTTEN_SUBMIT = 'FORGOTTEN_SUBMIT';

// signup
const REGISTER_INPUT_CHANGE = 'REGISTER_INPUT_CHANGE';
export const SIGNUP_SUBMIT = 'SIGNUP_SUBMIT';
const SIGNEDUP = 'SIGNEDUP';
const SIGNUP_ERROR = 'SIGNUP_ERROR';
const SIGNUP_RESET = 'SIGNUP_RESET';

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
export const ERROR_404 = 'ERROR_404';

// memory
const COUNT_PAIRS = 'COUNT_PAIRS';
const FINISHED = 'FINISHED';
const TENTATIVE = 'TENTATIVE';
const INCREMENTE_COUNT_CLICK = 'INCREMENTE_COUNT_CLICK';
const RESET_COUNT_CLICK = 'RESET_COUNT_CLICK';
const UPDATED_DATA = 'UPDATED_DATA';
const UPDATED_OPENED_CARD = 'UPDATED_OPENED_CARD';
const RESET_MEMORY = 'RESET_MEMORY';

// Puzzle
export const DATA_FOR_PUZZLE = 'DATA_FOR_PUZZLE';
export const DATA_FOR_PUZZLES = 'DATA_FOR_PUZZLES';

// User
export const GET_USER_INFOS = 'GET_USER_INFOS';

// Favoris
export const TOGGLE_FAVORIS = 'TOGGLE_FAVORIS';

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
        dataHomePage: [...action.data],
        error404: false
      };
    // form
    case HANDLE_LOGIN_CHANGE:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.name]: action.text,
          error: false
        }
      };

    case LOGIN_SUBMIT:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: true
        }
      };

    case LOGGED_IN:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: false,
          loggedIn: true
        },
        loggedIn: true,
        loggedUserInfos: action.data
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          error: true,
          loading: false
        }
      };

    case LOGIN_RESET:
      return {
        ...state,
        loginForm: {
          ...initialState.loginForm
        }
      };

    case REGISTER_INPUT_CHANGE:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          [action.name]: action.text
        }
      };

    case SIGNUP_SUBMIT:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          loading: true
        }
      };

    case SIGNEDUP:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          loading: false,
          signedUp: true
        }
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        registerForm: {
          ...state.registerForm,
          error: true
        }
      };

    case SIGNUP_RESET:
      return {
        ...state,
        registerForm: {
          ...initialState.registerForm
        }
      };

    case FORGOTTEN_SUBMIT:
      return {
        ...state
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
        dataHomeGame: { ...action.data },
        error404: false
      };
    case CATEGORIES_QUIZZS:
      return {
        ...state,
        categoriesQuizzs: [...action.data],
        error404: false
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
        quizzsByWorldId: action.data,
        error404: false
      };
    case QUESTION_BY_ID:
      return {
        ...state,
        loaded: false
      };
    case RECEIVED_DATA_QUESTIONS:
      return {
        ...state,
        loaded: true,
        questionsOfQuiz: [...action.dataQuestions],
        descriptionCurrentQuiz: action.dataDescription,
        currentNameQuiz: action.dataName,
        error404: false
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
    case ERROR_404:
      return {
        ...state,
        error404: true
      };
    case DATA_FOR_PUZZLES:
      return {
        ...state,
        puzzles: [...action.data]
      };
    case DATA_FOR_PUZZLE:
      return {
        ...state,
        puzzle: { ...action.data }
      };
    case COUNT_PAIRS:
      return {
        ...state,
        getCountPaire: (state.getCountPaire += 1)
      };
    case TENTATIVE:
      return {
        ...state,
        getTentative: (state.getTentative += 1)
      };
    case FINISHED:
      return {
        ...state,
        finished: true
      };
    case INCREMENTE_COUNT_CLICK:
      return {
        ...state,
        getCountClick: (state.getCountClick += 1)
      };
    case RESET_COUNT_CLICK:
      return {
        ...state,
        getCountClick: 0
      };
    case UPDATED_DATA:
      // console.log(action.data);
      return {
        ...state,
        dataMemory: action.data
      };
    case UPDATED_OPENED_CARD:
      return {
        ...state,
        openedCard:
          state.openedCard.length === 2
            ? action.data
            : [...state.openedCard, action.data]
      };
    case RESET_MEMORY:
      memory.map(data => shuffle(data.memory));
      return {
        ...state,
        dataMemory: [...JSON.parse(JSON.stringify(memory))],
        openedCard: [],
        getCountPaire: 0,
        getCountClick: 0,
        getTentative: 0,
        finished: false
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

export const registerInputChange = (text, name) => ({
  type: REGISTER_INPUT_CHANGE,
  text,
  name
});

export const loginSubmit = () => ({
  type: LOGIN_SUBMIT
});

export const loggedIn = data => ({
  type: LOGGED_IN,
  data
});

export const loginError = () => ({
  type: LOGIN_ERROR
});

export const loginReset = () => ({
  type: LOGIN_RESET
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

export const signupSubmit = () => ({
  type: SIGNUP_SUBMIT
});

export const signedUp = () => ({
  type: SIGNEDUP
});

export const signeUpError = () => ({
  type: SIGNUP_ERROR
});

export const signeUpReset = () => ({
  type: SIGNUP_RESET
});

export const dataForHomeGame = categoryId => ({
  type: DATA_HOME_GAME,
  categoryId
});

export const getQuizByWorldId = worldId => ({
  type: QUIZ_BY_WORLD_ID,
  worldId
});

export const getQuestionsByQuizId = id => ({
  type: QUESTION_BY_ID,
  id
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

export const receivedDataQuestions = (
  dataQuestions,
  dataDescription,
  dataName
) => ({
  type: RECEIVED_DATA_QUESTIONS,
  dataQuestions,
  dataDescription,
  dataName
});

export const infosCatAge = (category, id) => ({
  type: CURRENT_SLUG_CAT_AGE,
  category,
  id
});

export const getPage404 = () => ({
  type: ERROR_404
});

export const dataForPuzzles = worldId => ({
  type: DATA_FOR_PUZZLES,
  worldId
});

export const countPairs = () => ({
  type: COUNT_PAIRS
});

export const memoryFinished = () => ({
  type: FINISHED
});

export const tentative = () => ({
  type: TENTATIVE
});

export const incrementeCountClick = () => ({
  type: INCREMENTE_COUNT_CLICK
});

export const resetCountClick = () => ({
  type: RESET_COUNT_CLICK
});

export const updatedData = data => ({
  type: UPDATED_DATA,
  data
});

export const updatedOpenedCard = data => ({
  type: UPDATED_OPENED_CARD,
  data
});

export const resetMemory = () => ({
  type: RESET_MEMORY
});

export const dataForPuzzle = puzzleId => ({
  type: DATA_FOR_PUZZLE,
  puzzleId
});

// User
export const getUserInfos = data => ({
  type: GET_USER_INFOS,
  data
});

export const toggleFavoris = (quizId) => ({
  type: TOGGLE_FAVORIS,
  quizId,
})

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
