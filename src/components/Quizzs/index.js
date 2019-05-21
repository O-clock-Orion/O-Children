import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';

import './index.scss';

class Quizzs extends Component {
  componentDidMount() {
    this.props.getQuizByWorldId(this.props.categoryQuizId)
  }

  handleClick = () => () => {
    const { initialQuiz } = this.props;
    initialQuiz();
  };

  handleClickFav = () => {
    console.log('ok');
  }

  render() {
    const { quizzsByWorldId } = this.props;
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
              <FaRegHeart onClick={this.handleClickFav} color="#000" className="quizzs-fav" />
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
