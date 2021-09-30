import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import About from './About'

describe('About', () => {
  let renderer: ReturnType<typeof render>
  let getByTestId: Function
  let getAllByTestId: Function
  let getByText: Function

  beforeEach(() => {
    renderer = render(<About />)
    getByTestId = renderer.getByTestId
    getAllByTestId = renderer.getAllByTestId
    getByText = renderer.getByText
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('displays a link to the home page', () => {
    expect(getByTestId('home-link')).toBeInTheDocument()
    expect(getByText('Teleport Home')).toBeInTheDocument()
  })

  it('displays the about project section', () => {
    expect(getByTestId('about-project')).toHaveTextContent('Pokemans is a basic, general pokedex.')
  })

  it('displays the social icons', () => {
    expect(getByTestId('social-icons')).toBeInTheDocument()
    expect(getAllByTestId('media-icon')).toHaveLength(4)
  })
})
