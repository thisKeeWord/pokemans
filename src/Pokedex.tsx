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
  const { state } = location

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
            const sortedData = resultData.data.pokemon_species.sort(
              (a, b) => a.url.replace(/\D/g, '').slice(1) - b.url.replace(/\D/g, '').slice(1),
            )

            return sortedData
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
    if (params.name && !state) {
      getPokemonData(params.name)
    }
  }, [params.name])

  if (loading) {
    return <div className="spinner" />
  }

  return (
    <div className="pokeList">
      {error && <span>{error}</span>}
      <Generations genList={genList} getPokemonData={getPokemonData} />
      <PokemonEntry pokemonEntry={pokemonEntry} />
    </div>
  )
}

export default Pokedex
