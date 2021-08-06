import React, {FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import Pokelist from './Pokelist';

import $ from 'jquery';



const Pokedex: FunctionComponent = () => {
	const [list, setList] = useState<any[]>()
	const [pokemon, setPokemon] = useState<Record<any, any>>({})
	const [loading, setLoading] = useState<boolean>(false)

 // need to add spinner class to #pokedex
	useEffect(() =>{
		const fetchData = async () => {
			setLoading(true)

			try {
				const gensData = await axios.get('https://pokeapi.co/api/v2/generation/?limit=1500')
				let promises: any[] = []
				for (const data of gensData.data.results) {
					try {
						const resultData = await axios.get(data.url)
						const sortedData = resultData.data.info.pokemon_species.sort((a,b) => {
							return a.url.replace(/\D/g,'').slice(1) - b.url.replace(/\D/g,'').slice(1);
						});

						promises.push(sortedData)
					} catch (error) {
						console.log(error)
					}
				}

				setList(promises)
			} catch(error) {
				console.log(error)
			}
		}
	}, [])

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

