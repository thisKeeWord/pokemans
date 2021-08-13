import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import Pokegen from './Pokegen';

const Pokedex: FunctionComponent = () => {
  const [list, setList] = useState<any[]>()
  const [pokemon, setPokemon] = useState<Record<any, any>>({})
  const [loading, setLoading] = useState<boolean>(false)

  // need to add spinner class to #pokedex
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const gensData = await axios.get('https://pokeapi.co/api/v2/generation/?limit=1500')
        // eslint-disable-next-line no-restricted-syntax
        const fetchResults = await Promise.all(gensData.data.results.map(async (data) => {
          try {
            const resultData = await axios.get(data.url)
            const sortedData = resultData.data.info.pokemon_species.sort(
              (a, b) => a.url.replace(/\D/g, '').slice(1) - b.url.replace(/\D/g, '').slice(1),
            );

            return sortedData
          } catch (error) {
            // TODO: error handling
            console.log(error)
          }
        }))

        setList(fetchResults)
      } catch (error) {
        // TODO: error handling
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const selectPokemon = async (pokemonInfo: Record<any, any>) => {
    try {
      const pokemonData = await axios.get(pokemonInfo.url)
      setPokemon({
        name: pokemon.name,
        description: pokemonData.data,
      });
    } catch (error) {
      // TODO: error handling
      console.log(error)
    }
  }

  return (
    <div className="pokeList">
      <div className="list">
        {list?.map((element, index) => (
          <div className="dexByGen" key={index}>
            <h1 className="generation">
              Gen
              {' '}
              {index + 1}
            </h1>
            <Pokegen pokemonByGen={element} handler={selectPokemon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
