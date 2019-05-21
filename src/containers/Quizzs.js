/**
 * Npm import
 */
import { connect } from 'react-redux';
/**
 * Local import
 */
import Quizzs from 'src/components/Quizzs';

// Action Creators
import { getQuestionsByQuizId, initialQuiz, getQuizByWorldId, getUserInfos, toggleFavoris } from 'src/store/reducer';

const mapStateToProps = (state) => ({
  quizzsByWorldId: state.quizzsByWorldId,
  loggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  getQuestionsByQuizId: (id) => {
    dispatch(getQuestionsByQuizId(id));
  },
  initialQuiz: () => {
    dispatch(initialQuiz());
  },
  getQuizByWorldId: (worldId) => {
    dispatch(getQuizByWorldId(worldId));
  },
  handleGetUserInfos: () => dispatch(getUserInfos()),
  toggleFavoris: (quizId) => dispatch(toggleFavoris(quizId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quizzs);
