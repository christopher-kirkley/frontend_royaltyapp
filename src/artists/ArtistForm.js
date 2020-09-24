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
	}
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


	function EditButton() {
		return (
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Button 
						size="small"
						type="submit"
						variant="contained"
						color="primary"
						id="submit"
						fullWidth
						form="form"
						>
						Save
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button 
						size="small"
						variant="contained"
						color="secondary"
						id="cancel"
						fullWidth
						>
						Cancel
					</Button>
				</Grid>
			</Grid>
		)
	}

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
						/>	
					</Grid>
			</Grid>
		</form>
	)}



export default ArtistForm;
