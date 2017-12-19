import React from 'react';
import Pokegen from './Pokegen';



class Pokelist extends React.Component {
	render() {
		const that = this;
		let list = this.props.list.map((element, index) => {
			return (
				<div className="dexByGen">
					<h1 className="generation">Gen {index + 1}</h1>
					<Pokegen pokemonByGen={element} handler={that.props.select} />
				</div>
			);
		});
		return (
			<div className="list">
				{list}
			</div>
		);
	}
};

module.exports = Pokelist;