import React, { FunctionComponent } from 'react'

const FourOhFour: FunctionComponent = () => (
  <div className="four-oh-four-body">
    <div className="pikachu-gif">
      <img alt="pikachu" data-testid="pikachu" />
    </div>
    <p>It looks like you got lost in Diglett&apos;s Tunnel.</p>
    <div data-testid="four-oh-four-body">
      <span>
        Use this free
        {' '}
        <a href="/" data-testid="home-link"><strong>Escape Rope</strong></a>
        {' '}
        to return to the nearest saved point.
      </span>
    </div>
  </div>
)

export default FourOhFour
