import React from 'react';
import { Link } from 'react-router';



class Pokeitem extends React.Component {
	click(e) {
		e.preventDefault();
		this.props.handler(this.props.pokemon);
	}

	render() {
		return (
			<Link to={`/${this.props.pokemon.name}`}>{this.props.pokemon.name}</Link>
		);
	}
};

module.exports = Pokeitem;