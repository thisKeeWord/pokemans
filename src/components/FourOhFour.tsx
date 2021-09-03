import React, { FunctionComponent } from 'react'

const FourOhFour: FunctionComponent = () => (
  <div className="four-oh-four-body">
    <div data-testid="four-oh-four-body">
      <div className="pikachu-gif">
        <img alt="pikachu" data-testid="pikachu" />
      </div>
      <p>It looks like you got lost in Diglett&apos;s Tunnel.</p>
      <span>
        Use the Escape Rope
        {' '}
        <a href="/"><strong>here</strong></a>
        {' '}
        to return to the nearest saved point.
      </span>
    </div>
  </div>
)

export default FourOhFour
