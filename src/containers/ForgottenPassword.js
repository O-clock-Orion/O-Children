/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import ForgottenPassword from 'src/components/Login/ForgottenPassword';

// Action Creators
import { handleLoginChange, forgottenSubmit } from 'src/store/reducer';

const mapStateToProps = state => ({
  email: state.loginForm.email
});

const mapDispatchToProps = dispatch => ({
  handleChange: (text, name) => dispatch(handleLoginChange(text, name)),
  handleForgottenSubmit: () => dispatch(forgottenSubmit())
});

// Container
// connect(Ce dont j'ai besoin)(Qui en a besoin)
const ForgottenPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgottenPassword);

/**
 * Export
 */
export default ForgottenPasswordContainer;
