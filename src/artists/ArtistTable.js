import React, { useState, useEffect, useContext } from 'react'

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';

function ArtistTable() {
	
	const { catalogContext, artistsContext } = useContext(Context)

	const [artists, setArtists] = artistsContext
	
	const history = useHistory()

	// useEffect(() => { 
	// 	fetch('http://localhost:5000/artists')
	// 	.then(res => res.json())
	// 	.then(json => {
	// 		const sorted = [...json].sort(function(a, b){
	// 			if(a.artist_name < b.artist_name) {return -1;}
	// 			if(a.artist_name > b.artist_name) {return 1;}
	// 		})
	// 		setArtists(sorted)
	// 	})
	// }, [])

	function handleArtistDetail(id) {
		history.push(`/artist/${id}`)
	}

	return (
		<React.Fragment>
		{artists.length === 0 ?
			<Typography id="artists-data" variant="h6" align="center">No data</Typography> :
			<TableContainer>
			<Table id="artist-table" size="small">
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
									<Button
										size="small"
										variant="outlined"
										color="primary"
										id="artist-detail"
										value={artists.id}
										onClick={()=>handleArtistDetail(artists.id)}>
									Detail
									</Button>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				</Table>
				</TableContainer>
		}
		</React.Fragment>
	)
}


export default ArtistTable
