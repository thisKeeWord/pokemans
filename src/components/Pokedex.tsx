import React, {FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import Pokelist from './Pokelist';

import $ from 'jquery';



const Pokedex: FunctionComponent = () => {
	const [list, setList] = useState()
	const [pokemon, setPokemon] = useState<Record<any, any>>({})
	const [loading, setLoading] = useState<boolean>(false)

 // need to add spinner class to #pokedex
	useEffect(() =>{
		const fetchData = async () => {
			setLoading(true)

			try {

			
			const gensData = await axios.get('https://pokeapi.co/api/v2/generation/?limit=1500')
			// copy and paste code from tldr
			for (const data of gensData.data.results) {

			}
			} catch( error) {
				console.log(error)
			}
		}
	})

	componentDidMount() {
		const that = this;
		let gens;
		$.get('https://pokeapi.co/api/v2/generation/?limit=1500', data => {
			let allPokes = [];
			gens = data.results;
			gens.forEach((elem, index) => {
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

