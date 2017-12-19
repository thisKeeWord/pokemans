import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';



class Pokemon extends React.Component {
	constructor() {
		super();
		this.state = {
			description: {}
		};
	}

	componentDidMount() {
		const that = this;
		$.get(`https://pokeapi.co/api/v2/pokemon/${this.props.params.name}`, result => {
			that.setState({
				description: result
			});
		});
	}

	render() {
		const that = this;
		let pokemonImg = null;
		let description = Object.keys(this.state.description).map((key,value) => {
			if (that.state.description[key] !== null && (key === 'forms' || key === 'abilities' || key === 'stats' || key === 'weight' || key === 'moves' || key === 'height' || key === 'id' || key === 'order' || key === 'base_experience' || key === 'types' || key === 'sprites')) {
				if (Array.isArray(that.state.description[key])) {
					return (
						<div className="descriptor">
							<span className="key" id="information">{key.replace(/-/g, " ")}</span>
							<div className="key">
								{that.state.description[key].map((elem, index) => {
								if (elem.move) {
									if (index === that.state.description[key].length - 1) {
										return <span className="key">{elem.move.name.replace(/-/g, " ")}</span>
									}
									else {
										return <span className="key">{elem.move.name.replace(/-/g, " ")},&nbsp;&nbsp;</span>
									}
								}
								if (elem.name) {
									if (index === that.state.description[key].length - 1) {
										return <span className="key">{elem.name}</span>
									}
									else {
										return <span className="key">{elem.name},&nbsp;&nbsp;</span>									
									}
								}
								if (elem.ability) {
									if (index === that.state.description[key].length - 1) {
										return <span className="key">{elem.ability.name}</span>
									}
									else {
										return <span className="key">{elem.ability.name},&nbsp;&nbsp;</span>									
									}
								}
								if (elem.stat) {
									if (index === that.state.description[key].length - 1) {
										return <span className="key">{elem.stat.name} : {elem.base_stat}</span>
									}
									else {
										return <span className="key">{elem.stat.name} : {elem.base_stat}<br/></span>
									}
								}
								if (elem.type) {
									if (index === that.state.description[key].length - 1) {
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
				else if (key === 'sprites') {
					pokemonImg = <img src={that.state.description[key].front_default}></img>					
				}
				else {
					return (
						<div className="descriptor">
							<span className="key" id="information">{key.replace(/_/g, " ")}</span>
							<div className="key">{that.state.description[key].toString()}</div>
						</div>
					);	
				}
				
			}
		});
		return (
			<div>
				<div className="onTop">
					<h2>Name: {this.props.params.name.charAt(0).toUpperCase() + this.props.params.name.slice(1)}</h2>
					<Link to="/">
						<div className="goBack"></div>
					</Link>
				</div>
				<h3>Sprite: {pokemonImg}</h3>
				<h5>{description}</h5>
			</div>
		);
	}
};

module.exports = Pokemon;