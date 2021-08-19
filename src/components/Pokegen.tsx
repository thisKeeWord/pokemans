import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface PokegenProps {
  pokemonByGen: any[]
}

const Pokegen: FunctionComponent<PokegenProps> = ({ pokemonByGen }: PokegenProps) => {
  const genStack = pokemonByGen?.map((pokemon) => (
    <Link to={`/${pokemon.name}`} key={pokemon.name}>{pokemon.name}</Link>
  ));

  return (
    <div className="pokesGen">
      {genStack}
    </div>
  );
};

export default Pokegen;
