import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import AddArtist from "./AddArtist";
import {
	NavLink
} from "react-router-dom";
import { useHistory } from "react-router-dom";


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

	const [click, setClick] = useState(false);

	function handleClick(e) {
		e.preventDefault()
		fetch('http://localhost:5000/artists', {
			method: 'POST',
			// body: JSON.stringify({ id }),
		}).then(setClick(true))
	};

	if (click === true) {
			return <Redirect to='/artist_detail' />
	}

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
								<td><Button id="artist_detail" onClick={handleClick}>Detail</Button></td>
							</tr>
						)
					})}
				</tbody>
			</table>
	)}



function Artist() {

	const history = useHistory();

	function routeChange() {
		let path = '/add_artist';
		history.push(path);
	};

		return (
			<div>
			<Button id="add_artist" onClick={routeChange}>
				Add Artist
			</Button>
			<ArtistTable/>
			</div>
		);
	}

	

	

export default Artist;
