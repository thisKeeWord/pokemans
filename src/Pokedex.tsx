import React, { FunctionComponent, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Generations from './components/Generations'
import PokemonEntry from './components/PokemonEntry'

const rootUrl = 'https://pokeapi.co/api/v2'

const Pokedex: FunctionComponent = () => {
  const [genList, setGenList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [selectedPokemon, setSelectedPokemon] = useState<string>('')
  const [pokemonEntry, setPokemonEntry] = useState<Record<any, any>>({})
  const [pokemonEvolutionEntry, setPokemonEvolutionEntry] = useState<Record<any, any>>({})

  const params = useParams() as Record<any, any>
  const location = useLocation()
  const { state } = location as Record<any, any>

  const getPokemonData = async (name: string) => {
    try {
      const pokemonDataResults = await axios.get(`${rootUrl}/pokemon/${name}`)
      return pokemonDataResults.data
    } catch (err) {
      throw new Error(`Could not retrieve information about ${name}. ${err.message}`)
    }
  }

  const getEvolutionData = async (name: string) => {
    try {
      const evolutionDataResults = await axios.get(`${rootUrl}/pokemon-species/${name}`)
      const evolutionChainResults = await axios.get(evolutionDataResults.data.evolution_chain.url)
      return evolutionChainResults.data
    } catch (err) {
      throw new Error(`Could not retrieve evolution chain data about ${name}. ${err.message}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      error && setError('')

      try {
        const gensData = await axios.get(`${rootUrl}/generation/?limit=1500`)
        // eslint-disable-next-line no-restricted-syntax
        const fetchResults = await Promise.all(gensData.data.results.map(async (data, index: number) => {
          try {
            const resultData = await axios.get(data.url)
            // eslint-disable-next-line camelcase
            const { pokemon_species, main_region } = resultData.data
            const sortedData = pokemon_species.sort(
              (a, b) => a.url.replace(/\D/g, '').slice(1) - b.url.replace(/\D/g, '').slice(1),
            )

            return { region: main_region.name.charAt(0).toUpperCase() + main_region.name.slice(1), pokemonList: sortedData }
          } catch (err) {
            throw new Error(`An error occurred fetching the details of generation ${index + 1}`)
          }
        }).map((p) => p.catch((e) => {
          throw e
        })))

        setGenList(fetchResults)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true)

      try {
        const pokemonData = await getPokemonData(params.name)
        setPokemonEntry(pokemonData)

        const pokemonEvolutionData = await getEvolutionData(params.name)
        setPokemonEvolutionEntry(pokemonEvolutionData)
      } catch (er) {
        setError(er.message)
      } finally {
        setLoading(false)
      }
    }
    if (params.name) {
      setSelectedPokemon(params.name)
      fetchPokemonData()
    }
  }, [params.name])

  if (loading) {
    return <div className="spinner" data-testid="spinner" />
  }

  return (
    <div className="pokeList">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" data-testid="app-bar">
          <Toolbar>
            <Typography variant="h6" component="div">
              Pokemans
            </Typography>
            <Link href="/about" className="about-link" data-testid="about">About</Link>
            <div className="view">
              <Generations genList={genList} state={state} selectedPokemon={selectedPokemon} />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {error && <span data-testid="error">{error || 'yo'}</span>}
      {!Object.keys(pokemonEntry).length ? (
        <div className="home-info">
          <p className="main-desc">
            <strong>Pokemans</strong>
            {' '}
            is a basic, general pokedex.
          </p>
          <span className="sub-desc">
            To get started, click the
            {' '}
            <i>View Pokemon</i>
            {' '}
            button in the nav bar and select a region.
          </span>
          <span className="sub-desc">
            You can also add
            {' '}
            <i>/pokemon/yourpokemonname</i>
            {' '}
            in the url.
          </span>
        </div>
      ) : (
        <PokemonEntry pokemonEntry={pokemonEntry} pokemonEvolutionEntry={pokemonEvolutionEntry} />
      )}
    </div>
  )
}

export default Pokedex
