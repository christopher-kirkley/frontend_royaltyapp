import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
		<TableContainer>
		<Table id="artist-table">
			<TableHead>
				<TableRow>
					<TableCell>Artist Name</TableCell>
					<TableCell>Prenom</TableCell>
					<TableCell>Surnom</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{artists.map((artists, i) => {
					return (
						<TableRow key={i}>
							<TableCell>{artists.artist_name}</TableCell>
							<TableCell>{artists.prenom}</TableCell>
							<TableCell>{artists.surnom}</TableCell>
							<TableCell>
								<Button id="artist-detail" value={artists.id} onClick={handleArtistDetail}>Detail</Button></TableCell>
						</TableRow>
					)
				})}
			</TableBody>
			</Table>
			</TableContainer>
		</div>
	)
}


export default ArtistTable
