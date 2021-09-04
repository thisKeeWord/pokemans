import React, { FunctionComponent, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import axios from 'axios'
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
      {error && <span>{error}</span>}
      <Generations genList={genList} state={state} />
      <PokemonEntry pokemonEntry={pokemonEntry} />
    </div>
  )
}

export default Pokedex
