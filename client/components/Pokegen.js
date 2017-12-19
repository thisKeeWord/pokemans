import React from 'react';
import Pokeitem from './Pokeitem';



class Pokegen extends React.Component {
	render() {
        const that = this;
        let test = this.props.pokemonByGen;
		let genStack = this.props.pokemonByGen.map((element, index) => {
			return (<Pokeitem pokemon={element} handler={that.props.handler} />);
        });
        
		return (
			<div className="pokesGen">
				{genStack}
			</div>
		);
	}
};

module.exports = Pokegen;