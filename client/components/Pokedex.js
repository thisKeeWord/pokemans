import React from 'react';
import Pokemon from './Pokemon';
import Pokelist from './Pokelist';
import $ from 'jquery';



class Pokedex extends React.Component {
	constructor() {
		super();
		this.state = {
			list: [],
			pokemon: {}
		};
	}

	componentWillMount() {
		$("#pokedex").addClass("spinner");
	}

	componentDidMount() {
		const that = this;
		let gens;
		$.get('https://pokeapi.co/api/v2/generation/?limit=1500', data => {
			let allPokes = [];
			gens = data.results;
			gens.forEach((elem, index) => {
				let eachGen = [];
				$.ajax({
					method: 'GET',
					url: elem.url,
					success: info => {
						let pokes = info.pokemon_species;
						pokes = pokes.sort((a,b) => {
							return a.url.replace(/\D/g,'').slice(1) - b.url.replace(/\D/g,'').slice(1);
						});
						allPokes.push(pokes)
						if (gens.length === allPokes.length) {
							$("#pokedex").removeClass("spinner");
							that.setState({
								list: allPokes,
								pokemon: {}
							});			
						}		
					},
					async: false // make request synchronous
				});
			});
		});
	}

	selectPokemon(pokemon) {
		const that = this;
		$.get(pokemon.url, data => {
			that.setState({
				pokemon: {
					name: pokemon.name,
					description: data
				}
			});
		});
	}

	render() {
		return (
			<div className="pokeList">
				<Pokelist list={this.state.list} select={this.selectPokemon.bind(this)} />
			</div>
		);
	}
};

export default Pokedex;
