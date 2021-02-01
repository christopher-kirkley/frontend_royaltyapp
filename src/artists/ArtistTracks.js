import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Header from '../components/Header'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	textField: {
		'& input:disabled': { 
			color: 'black',

		}
	},
}))

function ArtistTracks (props) {

	const classes = useStyles()

	const { id } = useParams()

	const [tracks, setTracks] = useState([])
	
	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		fetch(`http://localhost:5000/artists/${id}/track`)
		.then(res => res.json())
		.then(json => {
			// const sorted = [...json].sort(function(a, b){
			// 	if(a.catalog_number < b.catalog_number) {return -1;}
			// 	if(a.catalog_number > b.catalog_number) {return 1;}
			// })
			setTracks(json)
		})
	}, [])

	return (
		<React.Fragment>
		{tracks.length == 0 ?
			<Typography id="artists-data" variant="h6" align="center">No data</Typography> :
		<TableContainer>
		<Table id="tracks-table" size="small">
			<TableHead>
				<TableRow>
					<TableCell>Track Name</TableCell>
					<TableCell>id</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{tracks.map((trackitem, i) => {
					return (
						<TableRow key={i}>
							<TableCell>{trackitem.track_name}</TableCell>
							<TableCell>{trackitem.id}</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
			</Table>
			</TableContainer>
		}
		</React.Fragment>
	)}



export default ArtistTracks;
