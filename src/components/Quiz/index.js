import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Score from '../Score';

import './index.scss';

class Quiz extends Component {
  componentDidMount() {
    this.props.getQuestionsByQuizId(this.props.quizId);
  }

  handleClick = e => {
    const { questionsOfQuiz, getMessage, answerIsTrue, disabledButton, indexQuiz, updateScore, userChosenAnswer } = this.props
    const userAnswer = e.currentTarget;
    const goodAnswer = () => questionsOfQuiz[indexQuiz].right_answer.content;

    if (disabledButton) {
      // si disabledButton vaut true c'est que l'user a deja repondu, il ne peut donc plus choisir de reponse

      if (userAnswer.textContent.trim() === goodAnswer()) {
        e.currentTarget.classList.add('quiz-responses--good');
        const messageForUser = 'Bravo, tu as trouvé la bonne réponse !';
        getMessage(messageForUser);
        answerIsTrue();
        updateScore();
      } else {
        e.currentTarget.classList.add('quiz-responses--bad');
        const messageForUser = `Désolé! Mauvaise réponse. La réponse est ${goodAnswer()}`;
        getMessage(messageForUser);

        const allAnswers = e.currentTarget.parentNode.childNodes;
        for (let i = 0; i < allAnswers.length; i++) {
          if (allAnswers[i].textContent.trim() === goodAnswer()) {
            allAnswers[i].classList.add('quiz-responses--good');
          }
        }
      }
    }

    userChosenAnswer();
  };

  render() {
    const { loaded, myScore, questionsOfQuiz, indexQuiz, message, answerTrue, handleClickButtonNext, disabledButton, getMyScore, score, messageScore } = this.props;
    console.log(questionsOfQuiz);
    return loaded && !myScore ? (
      <div className={myScore ? 'quiz quiz--score' : 'quiz'}>
        <div className="quiz-questions">
          <p className="quiz-question">{questionsOfQuiz[indexQuiz].content}</p>
          <div className="quiz-responses">
            {questionsOfQuiz[indexQuiz].answers.map(answer => {
              return (
                <p key={answer.id} onClick={this.handleClick}>
                  {answer.content}
                </p>
              );
            })}
          </div>
          {message !== '' && (
            <p
              className={
                answerTrue
                  ? 'quiz-message quiz-message--good'
                  : 'quiz-message quiz-message--bad'
              }
            >
              {' '}
              {message}{' '}
            </p>
          )}
  
          <p className="quiz-nbQuestions">
            {indexQuiz + 1} / {questionsOfQuiz.length}
          </p>
  
          {indexQuiz < questionsOfQuiz.length - 1 ? (
            <Button
              disabled={disabledButton}
              onClick={handleClickButtonNext}
              className="quiz-button-next"
            >
              Question suivante
            </Button>
          ) : (
            <Button
              disabled={disabledButton}
              onClick={getMyScore}
              className="quiz-button-next"
            >
              Voir mon score
            </Button>
          )}
        </div>
      </div>
    ) : (
      myScore && <Score score={score} messageScore={messageScore} />
    );
  }
};

Quiz.propTypes = {
  handleClickButtonNext: PropTypes.func.isRequired,
  questionsOfQuiz: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool.isRequired,
  indexQuiz: PropTypes.number.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  userChosenAnswer: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
  myScore: PropTypes.bool.isRequired,
  getMyScore: PropTypes.func.isRequired,
  answerTrue: PropTypes.bool.isRequired,
  answerIsTrue: PropTypes.func.isRequired,
  messageScore: PropTypes.string.isRequired
};

export default Quiz;
