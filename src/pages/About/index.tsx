import React, { FunctionComponent } from 'react'

import './index.scss'

const About: FunctionComponent = () => (
  <div className="about">
    <div className="about-body">
      <ul className="linkToPages">
        <li>
          <a href="/" data-testid="home-link">Teleport Home</a>
        </li>
      </ul>
      <div className="about-project" data-testid="about-project">
        <p className="main-desc">
          <strong>Pokemans</strong>
          {' '}
          is a very basic, general pokedex.
          It does not contain information for pokemon outside of their base (or initial) region.
        </p>
        <span className="sub-desc">
          You can view a Pokemon&apos;s base information by clicking on the menu in the homepage.
          You can also replace
          {' '}
          <i>/about</i>
          {' '}
          with
          {' '}
          <i>
            /pokemon/yourpokemonname
            <i />
          </i>
          {' '}
          in the url.
        </span>
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow icon-link" />
        </a>
        <a href="https://leonardk.herokuapp.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow icon-link" />
        </a>
      </div>
    </div>
  </div>
)

export default About
