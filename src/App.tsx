import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';



const App = () =>  {
    return (
      <Router history={hashHistory}>
        <Route exact path="/" component={Pokedex} />
        <Route path="/:name" component={Pokemon} />
      </Router>
    )
};

ReactDOM.render(<App />, document.getElementById('pokedex'));