import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import Pokegen from './Pokegen';

const Pokedex: FunctionComponent = () => {
  const [list, setList] = useState<any[]>()
  // const [pokemon, setPokemon] = useState<Record<any, any>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // need to add spinner class to #pokedex
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      error && setError('')

      try {
        const gensData = await axios.get('https://pokeapi.co/api/v2/generation/?limit=1500')
        // eslint-disable-next-line no-restricted-syntax
        const fetchResults = await Promise.all(gensData.data.results.map(async (data, index) => {
          try {
            const resultData = await axios.get(data.url)
            const sortedData = resultData.data.pokemon_species.sort(
              (a, b) => a.url.replace(/\D/g, '').slice(1) - b.url.replace(/\D/g, '').slice(1),
            );

            return sortedData
          } catch (err) {
            throw new Error(`An error occurred fetching the details of gen ${index + 1}`)
          }
        }))

        setList(fetchResults)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // const selectPokemon = async (pokemonInfo: Record<any, any>) => {
  //   error && setError('')
  //   try {
  //     const pokemonData = await axios.get(pokemonInfo.url)
  //     setPokemon({
  //       name: pokemon.name,
  //       description: pokemonData.data,
  //     });
  //   } catch (e) {
  //     setError(`There was an error getting information about ${pokemon.name}.`)
  //   }
  // }

  if (loading) {
    return <div className="spinner" />
  }

  return (
    <div className="pokeList">
      {error && <span>{error}</span>}
      <div className="list">
        {list?.map((element, index) => (
          <div className="dexByGen" key={index}>
            <h1 className="generation">
              Gen
              {' '}
              {index + 1}
            </h1>
            <Pokegen pokemonByGen={element} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
