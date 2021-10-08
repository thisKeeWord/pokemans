import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import axios from 'axios'
import Pokedex from './Pokedex'

const mockResponse = {
  count: 8,
  next: null,
  previous: null,
  results: [
    {
      name: 'generation-i',
      url: 'https://pokeapi.co/api/v2/generation/1/',
    },
    {
      name: 'generation-ii',
      url: 'https://pokeapi.co/api/v2/generation/2/',
    },
    {
      name: 'generation-iii',
      url: 'https://pokeapi.co/api/v2/generation/3/',
    },
    {
      name: 'generation-iv',
      url: 'https://pokeapi.co/api/v2/generation/4/',
    },
    {
      name: 'generation-v',
      url: 'https://pokeapi.co/api/v2/generation/5/',
    },
    {
      name: 'generation-vi',
      url: 'https://pokeapi.co/api/v2/generation/6/',
    },
    {
      name: 'generation-vii',
      url: 'https://pokeapi.co/api/v2/generation/7/',
    },
    {
      name: 'generation-viii',
      url: 'https://pokeapi.co/api/v2/generation/8/',
    },
  ],
}

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    name: 'squirtle',
  }),
  useLocation: () => ({
    state: '',
    search: '',
  }),
  useHistory: jest.fn(),
}))

describe('Pokedex', () => {
  it('renders the app bar', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: mockResponse }))
    const { getByTestId } = render(<Pokedex />)
    await waitFor(() => expect(getByTestId('app-bar')).toBeInTheDocument())
  })

  it('displays the about link', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ data: mockResponse }))
    const { getByTestId } = render(<Pokedex />)
    await waitFor(() => expect(getByTestId('about')).toBeInTheDocument())
  })

  it('calls the api to fetch the generations', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementationOnce(() => Promise.resolve({ data: mockResponse }))
    render(<Pokedex />)

    await waitFor(() => expect(spy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/generation/?limit=1500'))
  })

  it('displays the error if api call errors when fetching generations', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementationOnce(() => Promise.reject(new Error('failed')))
    const { getByTestId } = render(<Pokedex />)

    await waitFor(() => expect(getByTestId('error')).toBeInTheDocument())
  })

  it('makes the call to get pokemon`s data if pokemon name is in url', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementationOnce(() => Promise.resolve({ data: mockResponse }))

    render(<Pokedex />)

    await waitFor(() => expect(spy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/squirtle'))
  })
})
