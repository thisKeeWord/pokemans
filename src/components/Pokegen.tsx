import React, { FunctionComponent } from 'react';
import Pokeitem from './Pokeitem';

interface PokegenProps {
	pokemonByGen: any[]
	handler: () => void
}

const Pokegen: FunctionComponent<PokegenProps> = ({ pokemonByGen, handler }: PokegenProps) => {
	const genStack = pokemonByGen.map((element, index) => {
		return (<Pokeitem pokemon={element} handler={handler} key={index} />);
	});
			
	return (
		<div className="pokesGen">
			{genStack}
		</div>
	);
};

export default Pokegen;