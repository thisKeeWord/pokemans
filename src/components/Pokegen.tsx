import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface PokegenProps {
	pokemonByGen: any[]
	handler: (pokemon: Record<any, any>) => void
}

const Pokegen: FunctionComponent<PokegenProps> = ({ pokemonByGen, handler }: PokegenProps) => {
	const genStack = pokemonByGen.map((pokemon, index) => (
		<Link to={`/${pokemon.name}`} key={pokemon.name}>{pokemon.name}</Link>
	));
			
	return (
		<div className="pokesGen">
			{genStack}
		</div>
	);
};

export default Pokegen;