import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';

import './index.scss';

class Quizzs extends Component {
  componentDidMount() {
    const { getQuizByWorldId, categoryQuizId, handleGetUserInfos, loggedIn } = this.props;

    if (loggedIn) handleGetUserInfos();
    getQuizByWorldId(categoryQuizId)
    
  }

  handleClick = () => () => {
    const { initialQuiz } = this.props;
    initialQuiz();
  };

<<<<<<< HEAD
  handleClickFav = quizId => () => {
    console.log('send');
    const { toggleFavoris } = this.props;
    toggleFavoris(quizId);
=======
  handleClickFav = () => {
    console.log('ok');
>>>>>>> 312e983619f06a3ef3636cf30b286f12faaf0558
  }

  render() {
    const { quizzsByWorldId } = this.props;
    // console.log(quizzsByWorldId);
    return (
      <div className="quizzs">

        <div className="wrapper-quizzs">
          {quizzsByWorldId.map(quiz => (
            <div className="quizzs-quiz" key={quiz.quizzs[0].id}>
              <Link
                onClick={this.handleClick(quiz.quizzs[0].id)}
                to={`/quiz/${quiz.quizzs[0].id}`}
              >
                {quiz.quizzs[0].title}
              </Link>
<<<<<<< HEAD
              <FaRegHeart onClick={this.handleClickFav(quiz.quizzs[0].id)} color="#000" className="quizzs-fav" />
=======
              <FaRegHeart onClick={this.handleClickFav} color="#000" className="quizzs-fav" />
>>>>>>> 312e983619f06a3ef3636cf30b286f12faaf0558
            </div>
          ))}
        </div>
        
      </div>
    )
  }
};

Quizzs.propTypes = {
  quizzsByWorldId: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialQuiz: PropTypes.func.isRequired
};
export default Quizzs;
