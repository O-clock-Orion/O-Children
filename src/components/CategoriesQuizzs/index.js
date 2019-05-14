import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import './index.scss';

class CategoriesQuizzs extends Component {
  componentDidMount() {
    this.props.getAllCategoriesQuizzs(); // Lancement de l'action pour récupérer toutes les catégories de quiz
  }

  render() {
    const { categoriesQuizzs } = this.props;

    return (
      <div className="categories">
        <h1>Les catégories de nos quizzs</h1>

        <div className="wrapper-categories">
          {categoriesQuizzs.map(({ id, name, image }) => {
            
            return (
              <Link
                key={id}
                className="categories-quiz"
                to={`/category/${id}`}
              >
                <img src={`/src/assets/img/${image}`} alt="icon" />
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

CategoriesQuizzs.propTypes = {
  getAllCategoriesQuizzs: PropTypes.func.isRequired,
  categoriesQuizzs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesQuizzs;
