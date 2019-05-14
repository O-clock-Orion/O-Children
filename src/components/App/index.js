/**
 * Import
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * Local import
 */
// Composants
import Header from '../Header';
import Home from '../../containers/Home';
import HomeGame from '../../containers/HomeGame';
import CategoriesQuizzs from '../../containers/CategoriesQuizzs';
import Quizzs from '../../containers/Quizzs';
import Quiz from '../../containers/Quiz';
import MyPuzzle from '../MyPuzzle';

// Styles et assets
import './app.scss';

/**
 * Code
 */
const App = () => (
  <div id="app">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home-game/:category/puzzle" component={MyPuzzle} />
      <Route // is ok
        exact
        strict
        path="/categories"
        component={CategoriesQuizzs}
      />
      <Route exact path="/quiz/:quizId"
        render={({ match }) => {
          const { quizId } = match.params;

          return <Quiz quizId={quizId} />;
        }}
      />
      <Route
        exact
        path="/category/:worldId"
        render={({ match }) => {
          const { worldId, catQuizName } = match.params;
          return <Quizzs worldId={worldId} catQuizName={catQuizName}/>;
        }}
      />
      <Route // is ok
        exact
        path="/home-game/:category"
        render={({ match }) => {
          const { category } = match.params;

          return <HomeGame category={category} />;
        }}
      />
    </Switch>
  </div>
);

/**
 * Export
 */
export default App;
