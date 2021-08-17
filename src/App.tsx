import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';

import './App.css'

const App: FunctionComponent = () => (
  <HashRouter>
    <Route exact path="/" component={Pokedex} />
    <Route path="/:name" component={Pokemon} />
  </HashRouter>
);

export default App
