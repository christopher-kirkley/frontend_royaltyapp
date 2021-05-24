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
import CircularProgress from '@material-ui/core/CircularProgress'

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';


function ArtistTable() {
	
	const history = useHistory()
	const { catalogContext, artistsContext, loadingContext } = useContext(Context)

	const [artists, setArtists] = artistsContext
	// const [ loading, setLoading ] = loadingContext
	// console.log(artists)
	const { loading, setLoading } = useState(false)



	function handleArtistDetail(id) {
		history.push(`/artist/${id}`)
	}

	return (
		<React.Fragment>
		{
			loading ?
			<div align="center">
			<CircularProgress color="primary" size='2rem'/>
			</div>
			:
			artists.length === 0
			?
			<Typography id="artists-data" variant="h6" align="center">No data</Typography>
			:
			<TableContainer>
			<Table id="artist-table" size="small">
				<TableHead>
					<TableRow>
						<TableCell>Artist Name</TableCell>
						<TableCell>Contact</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ 
					artists.map((artists, i) => {
						return (
							<TableRow key={i}>
								<TableCell>{artists.artist_name}</TableCell>
								<TableCell>{artists.contact ?
									(artists.contact.prenom + ' ' + artists.contact.middle + ' ' + artists.contact.surnom)
									:
									''}
							</TableCell>
								<TableCell>
									<Button
										size="small"
										variant="outlined"
										color="primary"
										id={`view-${artists.id}`}
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
