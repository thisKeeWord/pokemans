import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';

const App = () => (
  <HashRouter>
    <Route exact path="/" component={Pokedex} />
    <Route path="/:name" component={Pokemon} />
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('pokedex'));

export default App
