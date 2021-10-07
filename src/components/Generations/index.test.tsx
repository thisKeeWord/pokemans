import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Generations from '.'

const genList = [
  {
    region: 'Kanto',
    pokemonList: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
      },
    ],
  },
]

const mockHistoryPush = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('Generations', () => {
  let renderer: ReturnType<typeof render>
  let getByTestId: Function
  let getAllByTestId: Function
  let queryByTestId: Function
  let rerender: Function

  beforeEach(() => {
    renderer = render(<Generations genList={genList} />)
    getByTestId = renderer.getByTestId
    getAllByTestId = renderer.getAllByTestId
    queryByTestId = renderer.queryByTestId
    rerender = renderer.rerender
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('renders the View Pokemon button', () => {
    expect(getByTestId('view-pokemon')).toBeInTheDocument()
  })

  it('does not display the drawer list by default', () => {
    expect(queryByTestId('gen-region-item')).not.toBeInTheDocument()
  })

  it('renders the genList region items', () => {
    const btn = getByTestId('view-pokemon')
    fireEvent.click(btn)

    expect(getAllByTestId('gen-region-item')).toHaveLength(genList.length)
  })

  it('renders the genList pokemon items', () => {
    const btn = getByTestId('view-pokemon')
    fireEvent.click(btn)

    const regionBtn = getAllByTestId('gen-region-item')[0]
    fireEvent.click(regionBtn)

    expect(getAllByTestId('gen-pokemon-item')).toHaveLength(genList[0].pokemonList.length)
  })

  it('pushes the selected pokemon to the url', () => {
    const btn = getByTestId('view-pokemon')
    fireEvent.click(btn)

    const regionBtn = getAllByTestId('gen-region-item')[0]
    fireEvent.click(regionBtn)

    const pokemonBtn = getAllByTestId('gen-pokemon-item')[0]
    fireEvent.click(pokemonBtn)

    expect(mockHistoryPush)
      .toHaveBeenCalledWith(`/pokemon/${genList[0].pokemonList[0].name}`, { updated: true, generation: genList[0].region })
  })

  it('displays the pokemon passed in from url once sidenav is clicked', () => {
    rerender(<Generations genList={genList} selectedPokemon={genList[0].pokemonList[0].name} />)

    const btn = getByTestId('view-pokemon')
    fireEvent.click(btn)

    expect(getAllByTestId('gen-pokemon-item')[0]).toHaveTextContent(genList[0].pokemonList[0].name)
  })
})
