import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios'



const Pokemon: FunctionComponent = () => {
	const [description, setDescription] = useState<Record<any, any>>({})
	const [error, setError] = useState<string>('')
	const params = useParams() as Record<any, any>

	useEffect(() => {
		const getPokemon = async () => {
			try {
				const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
				setDescription(results.data)
			} catch (error) {
				setError(error.message)
			}
		}

		getPokemon()
	}, [])
		
	return (
		<div>
			<div className="onTop">
				<h2>Name: {params.name.charAt(0).toUpperCase() + params.name.slice(1)}</h2>
				<Link to="/">
					<div className="goBack"></div>
				</Link>
			</div>
			<h3>Sprite: <img src={description.sprites.front_default}></img></h3>
			<h5>
				{Object.keys(description).map((key,index) => {
					if (!!description[key] && (['forms', 'abilities', 'stats', 'weight', 'moves', 'height', 'id', 'order', 'base_experience', 'types', 'sprites'].includes(key))) {
						if (Array.isArray(description[key])) {
							return (
								<div className="descriptor" key={index}>
									<span className="key" id="information">{key.replace(/-/g, " ")}</span>
									<div className="key">
										{description[key].map((elem, index) => {
										if (elem.move) {
											if (index === description[key].length - 1) {
												return <span className="key">{elem.move.name.replace(/-/g, " ")}</span>
											}
											else {
												return <span className="key">{elem.move.name.replace(/-/g, " ")},&nbsp;&nbsp;</span>
											}
										}
										if (elem.name) {
											if (index === description[key].length - 1) {
												return <span className="key">{elem.name}</span>
											}
											else {
												return <span className="key">{elem.name},&nbsp;&nbsp;</span>									
											}
										}
										if (elem.ability) {
											if (index === description[key].length - 1) {
												return <span className="key">{elem.ability.name}</span>
											}
											else {
												return <span className="key">{elem.ability.name},&nbsp;&nbsp;</span>									
											}
										}
										if (elem.stat) {
											if (index === description[key].length - 1) {
												return <span className="key">{elem.stat.name} : {elem.base_stat}</span>
											}
											else {
												return <span className="key">{elem.stat.name} : {elem.base_stat}<br/></span>
											}
										}
										if (elem.type) {
											if (index === description[key].length - 1) {
												return <span className="key">{elem.type.name.replace(/-/g, " ")}</span>
											}
											else {
												return <span className="key">{elem.type.name.replace(/-/g, " ")},&nbsp;&nbsp;</span>
											}
										}
									})}
									</div>
								</div>
							);
						}
						else {
							return (
								<div className="descriptor" key={index}>
									<span className="key" id="information">{key.replace(/_/g, " ")}</span>
									<div className="key">{description[key].toString()}</div>
								</div>
							);	
						}
					}
				})}
			</h5>
		</div>
	);
};

export default Pokemon;