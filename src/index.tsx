import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Pokedex from './Pokedex'
import './index.css'
import reportWebVitals from './reportWebVitals'
import FourOhFour from './components/FourOhFour'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Pokedex} />
        <Route path="/pokemon/:name" component={Pokedex} />
        <Route path="*" component={FourOhFour} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('pokedex'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
