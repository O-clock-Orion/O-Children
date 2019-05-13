import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameMenu from '../GameMenu';
import './index.scss';

class HomeGame extends Component {
  componentDidMount() {
    this.props.dataForHomeGame(this.props.category);
  }

  render() {
    const { category, dataHomeGame } = this.props;
    return (
      <div className="homeGame">
        <div className="homeGame-title">
          <h1> { dataHomeGame.description } </h1>
        </div>
        <GameMenu category={category} />
      </div>
    );
  }
}

HomeGame.propTypes = {
  category: PropTypes.string.isRequired,
  dataHomeGame: PropTypes.object.isRequired,
};

export default HomeGame;
