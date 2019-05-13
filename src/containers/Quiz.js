/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Quiz from 'src/components/Quiz';

// Action Creators
import {
  handleClickButtonNext,
  userChosenAnswer,
  updateScore,
  getMessage,
  getMyScore,
  answerIsTrue,
  messageScore,
  getQuestionsByQuizId
} from 'src/store/reducer';

const mapStateToProps = state => ({
  questionsOfQuiz: state.questionsOfQuiz,
  responses: state.responses,
  loaded: state.loaded,
  indexQuiz: state.indexQuiz,
  disabledButton: state.disabledButton,
  message: state.message,
  score: state.score,
  myScore: state.myScore,
  answerTrue: state.answerTrue,
  messageScore: messageScore(state),
});

const mapDispatchToProps = dispatch => ({
  handleClickButtonNext: () => {
    dispatch(handleClickButtonNext());
  },
  userChosenAnswer: () => {
    dispatch(userChosenAnswer());
  },
  updateScore: () => {
    dispatch(updateScore());
  },
  getMessage: message => {
    dispatch(getMessage(message));
  },
  getMyScore: () => {
    dispatch(getMyScore());
  },
  answerIsTrue: () => {
    dispatch(answerIsTrue());
  },
  getQuestionsByQuizId: (id) => {
    dispatch(getQuestionsByQuizId(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
