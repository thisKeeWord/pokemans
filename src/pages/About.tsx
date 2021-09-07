import React, { FunctionComponent } from 'react'

const About: FunctionComponent = () => (
  <div className="about">
    <div className="about-body">
      <div id="backHome">
        <ul className="linkToPages">
          <li>
            <a href="/" data-testid="home-link">Teleport Home</a>
          </li>
        </ul>
      </div>
      <div className="about-project" data-testid="about-body">
        Pokemans is a basic, general pokedex.
        You can search for any given existing Pokemon and will see basic information about the selected Pokemon.
      </div>
      <div className="icons" data-testid="social-icons">
        <a href="https://www.linkedin.com/in/thiskeeword" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-linkedin fa-lg li grow" id="icon-link" />
        </a>
        <a href="https://www.github.com/thisKeeWord" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-github-alt fa-lg gh grow" id="icon-link" />
        </a>
        <a href="https://www.instagram.com/theonlyleonardk" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-instagram fa-lg gh grow" id="icon-link" />
        </a>
        <a href="http://www.leonardkee.com" target="_blank" rel="noreferrer" data-testid="media-icon">
          <i className="fa fa-laptop fa-lg gh grow" id="icon-link" />
        </a>
      </div>
    </div>
  </div>
)

export default About
