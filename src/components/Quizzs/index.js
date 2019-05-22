import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';

import './index.scss';

class Quizzs extends Component {
  componentDidMount() {
    const {
      getQuizByWorldId,
      categoryQuizId,
      handleGetUserInfos,
      loggedIn
    } = this.props;

    if (loggedIn) handleGetUserInfos();
    getQuizByWorldId(categoryQuizId);
  }

  handleClick = () => () => {
    const { initialQuiz } = this.props;
    initialQuiz();
  };

  handleClickFav = quizId => () => {
    const { toggleFavoris } = this.props;
    toggleFavoris(quizId);
  };

  render() {
    const { quizzsByWorldId } = this.props;
    // console.log(quizzsByWorldId);
    return (
      <div className="quizzs">
        <div className="wrapper-quizzs">
          {quizzsByWorldId.map(quiz => (
            <div className="quizzs-quiz" key={quiz.quizzs[0].id}>
              <img
                src={`http://92.243.9.67/plateforme-educative-api/public/uploads/images/${
                  quiz.quizzs[0].image
                }`}
                alt="icon"
              />
              <Link
                onClick={this.handleClick(quiz.quizzs[0].id)}
                to={`/quiz/${quiz.quizzs[0].id}`}
              >
                {quiz.quizzs[0].title}
              </Link>
              <FaRegHeart
                onClick={this.handleClickFav(quiz.quizzs[0].id)}
                color="#000"
                className="quizzs-fav"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Quizzs.propTypes = {
  quizzsByWorldId: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialQuiz: PropTypes.func.isRequired,
  getQuizByWorldId: PropTypes.func.isRequired,
  categoryQuizId: PropTypes.string.isRequired,
};
export default Quizzs;
