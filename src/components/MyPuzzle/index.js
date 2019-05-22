import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Puzzle from 'react-image-puzzle';
import MediaQuery from 'react-responsive';
import './index.scss';

class MyPuzzle extends Component {
  imgPuzzle = React.createRef();

  puzzle = React.createRef();

  textWin = React.createRef();

  componentDidMount() {
    const { dataForPuzzle, puzzleId } = this.props;
    dataForPuzzle(puzzleId);
  }

  puzzleFinished = () => {
    this.imgPuzzle.current.className = 'puzzle-img puzzle-img--show';
    this.puzzle.current.className = 'puzzle--hide';
    this.textWin.current.style.transition = '1.5s';
    this.textWin.current.style.opacity = '1';
    this.textWin.current.style.top = '200.500px';
  };

  render() {
    const { puzzle, loaded } = this.props;

    return (
      <Fragment>
        <div className="puzzle">
          <p ref={this.textWin} className="puzzle-win-text">
            BRAVO !
          </p>
          {
            loaded && (
              <Fragment>
                <h1>{ puzzle.title } </h1>
                <div ref={this.puzzle}>
                  <MediaQuery query="(max-width: 768px)">
                    <Puzzle
                      image={`http://92.243.9.67/plateforme-educative-api/public/uploads/images/${
                        puzzle.image
                      }`}
                      size={350}
                      onDone={this.puzzleFinished}
                    />
                  </MediaQuery>
      
                  <MediaQuery query="(min-width: 769px)">
                    <Puzzle
                      image={`http://92.243.9.67/plateforme-educative-api/public/uploads/images/${
                        puzzle.image
                      }`}
                      size={550}
                      onDone={this.puzzleFinished}
                    />
                  </MediaQuery>
                </div>
              </Fragment>
            )
          }
          <img
            className="puzzle-img"
            ref={this.imgPuzzle}
            src={`http://92.243.9.67/plateforme-educative-api/public/uploads/images/${
              puzzle.image
            }`}
            alt=""
          />
        </div>
      </Fragment>
    );
  }
}

MyPuzzle.propTypes = {
  puzzle: PropTypes.object.isRequired,
  dataForPuzzle: PropTypes.func.isRequired,
  puzzleId: PropTypes.string.isRequired,
  loaded: PropTypes.bool.isRequired,
};

export default MyPuzzle;
