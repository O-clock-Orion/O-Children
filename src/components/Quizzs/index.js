import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';

import './index.scss';

class Quizzs extends Component {
  componentDidMount() {
    this.props.getQuizByWorldId(this.props.worldId)
  }

  handleClick = id => () => {
    const { initialQuiz } = this.props;
    initialQuiz();
  };

  render() {
    const { catQuizName, quizzsByWorldId } = this.props;
    return (
      <div className="quizzs">
        <h1>{ catQuizName }</h1>

        <div className="wrapper-quizzs">
          {quizzsByWorldId.map(quiz => (
            <div className="quizzs-quiz" key={quiz.quizzs[0].id}>
              <Link
                onClick={this.handleClick(quiz.quizzs[0].id)}
                to={`/home-game/${quiz.quizzs[0].world.id}/${quiz.name}/${quiz.quizzs[0].id}`}
              >
                {quiz.quizzs[0].title}
              </Link>
              <FaRegHeart color="#000" className="quizzs-fav" />
            </div>
          ))}
        </div>
        
      </div>
    )
  }
};

Quizzs.propTypes = {
  getQuestionsByQuizId: PropTypes.func.isRequired,
  initialQuiz: PropTypes.func.isRequired
};
export default Quizzs;
