import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';


function ArtistTable() {
	
	const [artists, setArtists] = useState([])
	
	const history = useHistory()

	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	function handleArtistDetail(e) {
		const id = e.target.value
		history.push(`/artist/${id}`)

	}

	return (
		<div>
		Artist Table
			<table id="artist_table">
				<thead>
					<tr>
						<th>Artist Name</th>
						<th>Prenom</th>
						<th>Surnom</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{artists.map((artists, i) => {
						return (
							<tr key={i}>
								<td>{artists.artist_name}</td>
								<td>{artists.prenom}</td>
								<td>{artists.surnom}</td>
								<td><Button id="artist-detail" value={artists.id} onClick={handleArtistDetail}>Detail</Button></td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}


export default ArtistTable
