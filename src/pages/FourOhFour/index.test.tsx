import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import FourOhFour from '.'

describe('FourOhFour', () => {
  let renderer: ReturnType<typeof render>
  let getByTestId: Function
  let getByText: Function

  beforeEach(() => {
    renderer = render(<FourOhFour />)
    getByTestId = renderer.getByTestId
    getByText = renderer.getByText
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('displays a link to the home page', () => {
    expect(getByTestId('home-link')).toBeInTheDocument()
    expect(getByText('Escape Rope')).toBeInTheDocument()
  })

  it('displays the FourOhFour section', () => {
    expect(getByTestId('four-oh-four-body')).toBeInTheDocument()
  })

  it('displays the pikachu gif', () => {
    expect(getByTestId('pikachu')).toBeInTheDocument()
  })
})
