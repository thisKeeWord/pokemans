import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import PokemonEntry from '.'

import pokemon from '../../../example_json/pokemon.json'
import evolutionChain from '../../../example_json/evolution-chain.json'

describe('PokemonEntry', () => {
  it('displays no pokemon selected text if no pokemon passed', () => {
    const { getByText, queryByTestId } = render(<PokemonEntry pokemonEntry={{}} pokemonEvolutionEntry={{}} />)
    expect(getByText('No Pokémon selected.')).toBeInTheDocument()
    expect(queryByTestId('pokemon-information')).not.toBeInTheDocument()
  })

  it('displays the table if the pokemonEntry prop has the "name" key', () => {
    const { queryByText, getByTestId } = render(<PokemonEntry pokemonEntry={pokemon} pokemonEvolutionEntry={evolutionChain} />)
    expect(queryByText('No Pokémon selected.')).not.toBeInTheDocument()
    expect(getByTestId('pokemon-information')).toBeInTheDocument()
  })
})
