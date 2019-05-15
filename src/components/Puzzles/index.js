import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.scss';

const Puzzles = ({ puzzles }) => {
  return (
    <div className="puzzles">
      <h1>Les puzzles</h1>

      <div className="puzzles-puzzle">
        {
          puzzles.map(({ icon, title, id }) => (
            <div key={id} className="puzzles-puzzle-infos">
              <img src={icon} alt={title} />
              <Link to={`/puzzle/${id}`}> { title } </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

Puzzles.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Puzzles;