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

import Header from '../components/Header'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	textField: {
		'& input:disabled': { 
			backgroundColor: '#D3D3D3',
			color: 'black'
		}
	},
}))

function ArtistForm (props) {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])
	
	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/artists/${props.id}`)
		.then(res => res.json())
		.then(json => setArtist(json))
		}
	}, [])

	useEffect(() => {
		
		setValue([
			{artist_name: artist.artist_name},
			{prenom: artist.prenom},
			{surnom: artist.surnom},
			{id: artist.id},
		])
	}, [artist])

	return (
				<form onSubmit={handleSubmit(props.onSubmit)} id="form">
				<Grid container
						direction="column"
						alignItems="center">
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="artist_name"
							id="artist_name"
							defaultValue=""
							control={control}
							label="Artist Name"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="prenom"
							id="prenom"
							control={control}
							label="Prenom"
							defaultValue=""
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="surnom"
							id="surnom"
							control={control}
							label="Surnom"
							defaultValue=""
							style={{marginBottom: 20}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
			</Grid>
		</form>
	)}



export default ArtistForm;
