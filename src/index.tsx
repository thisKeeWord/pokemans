import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import Pokedex from './Pokedex'
import './index.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Route exact path="/" component={Pokedex} />
      <Route path="/:name" component={Pokedex} />
      {/* Add about page */}
      {/* Add FourOhFour page */}
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('pokedex'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
