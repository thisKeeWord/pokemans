import React, { FunctionComponent, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Generations from './components/Generations'
import PokemonEntry from './components/PokemonEntry'

const rootUrl = 'https://pokeapi.co/api/v2'

const Pokedex: FunctionComponent = () => {
  const [genList, setGenList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [pokemonEntry, setPokemonEntry] = useState<Record<any, any>>({})
  const params = useParams() as Record<any, any>
  const location = useLocation()
  const { state } = location as Record<any, any>

  const getPokemonData = async (name: string) => {
    setLoading(true)

    try {
      const results = await axios.get(`${rootUrl}/pokemon/${name}`)
      setPokemonEntry(results.data)
    } catch (err) {
      setError(`Could not retrieve information about ${name}. ${err.message}`)
    } finally {
      setLoading(false)
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
        }))

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
    if (params.name) {
      getPokemonData(params.name)
    }
  }, [params])

  if (loading) {
    return <div className="spinner" />
  }

  return (
    <div className="pokeList">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">
              Pokemans
            </Typography>
            <Link href="/about" className="about-link">About</Link>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              className="pokemon-menu"
            >
              <Generations genList={genList} state={state} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {/* {error && <span>{error || 'yo'}</span>} */}
      {!Object.keys(pokemonEntry).length ? (
        <div>
          Pokemans is a basic, general pokedex.
          To get started, click the &lsquo;View Pokemon&lsquo; button in the nav bar and select a region.
          You can also add &lsquo;/pokemon/yourpokemonname&lsquo; in the url.
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default Pokedex
