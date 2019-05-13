/**
 * Npm import
 */
import { connect } from 'react-redux';
import slugify from 'slugify';
/**
 * Local import
 */
import Quizzs from 'src/components/Quizzs';

// Action Creators
import { getQuestionsByQuizId, initialQuiz, getQuizByWorldId } from 'src/store/reducer';

const mapStateToProps = (state) => ({
  quizzsByWorldId: state.quizzsByWorldId,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quizzs);
