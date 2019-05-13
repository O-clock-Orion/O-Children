/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import CategoriesQuizzs from 'src/components/CategoriesQuizzs';

// Action Creators
import {
  getAllCategoriesQuizzs,
} from 'src/store/reducer';

const mapStateToProps = state => ({
  categoriesQuizzs: state.categoriesQuizzs,
});

const mapDispatchToProps = dispatch => ({
  getAllCategoriesQuizzs: () => {
    dispatch(getAllCategoriesQuizzs());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesQuizzs);
