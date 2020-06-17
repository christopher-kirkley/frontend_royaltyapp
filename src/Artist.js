import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import AddArtist from "./AddArtist";


class ArtistTable extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			artists: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => this.setState({'artists': json}))
		console.log(this.state.artists)
	}

	render() {
		return (
			<Table artists={this.state.artists}/>
		);
	}
}
			
function Table ({artists}) {
	return (
			<table id="artist_table">
				<thead>
					<tr>
						<th>Artist Name</th>
						<th>Prenom</th>
						<th>Surnom</th>
					</tr>
				</thead>
				<tbody>
					{artists.map((artists, i) => {
						return (
							<tr key={i}>
								<td>{artists.artist_name}</td>
								<td>{artists.prenom}</td>
								<td>{artists.surnom}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
	)}


function Artist() {

	const [form, showForm] = useState(null)
	const [table, showTable] = useState(<ArtistTable/>)
	const [value, setValue] = useState(true)
	console.log({value})

	// this isn't evaluating at ALL
	if ({value}==false) {
		return (
			<div>
			<p>Cheeseburger</p>
			</div>
		);
	}

	return (
		<div className="Artist">
			<header className="Artist-header">
				<Button id="add_artist" onClick={() => showForm(<AddArtist setValue={setValue}/>) | showTable(null)}>
					Add Artist
				</Button>
		

			{form}
			</header>
			{table}
		</div>
	);
}

function onClickButton () {
	this.setState({ showForm: true });
}
	

export default Artist;
