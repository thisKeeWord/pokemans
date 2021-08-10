import React, { FunctionComponent } from 'react';
import Pokegen from './Pokegen';

interface PokelistProps {
	list: any[]
	select: () => void
}

const Pokelist: FunctionComponent<PokelistProps> = ({ list, select}: PokelistProps) => {
	const listResults = list.map((element, index) => {
		return (
			<div className="dexByGen" key={index}>
				<h1 className="generation">Gen {index + 1}</h1>
				<Pokegen pokemonByGen={element} handler={select} />
			</div>
		);
	});
	
	return (
		<div className="list">
			{listResults}
		</div>
	);
};

export default Pokelist;