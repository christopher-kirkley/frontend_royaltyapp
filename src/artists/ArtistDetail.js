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
	content: {
		backgroundColor: "grey"
	}
}))

function ArtistDetail () {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])
	const [edit, setEdit] = useState(true)
	
	const { register, handleSubmit, control, error, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/artists/${id}`)
		.then(res => res.json())
		.then(json => setArtist(json))
		.then(res => setEdit(false))
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

	function addArtist(data) {
		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom
		fetch('http://localhost:5000/artists', {
			method: 'POST',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(json => history.push('/artists/'))
	}
	
	function editArtist(data) {
		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom
		fetch(`http://localhost:5000/artists/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(json => history.push('/artists/'))
	}

	function handleClick() {
		setEdit(true)
	}

	function EditButton() {
		if (edit == false) {
			return <Button 
						onClick={handleClick}
						variant="contained"
						color="primary"
						id="submit"
						fullWidth
						>
						Edit
					</Button>
		}
		return <Button 
						type="submit"
						variant="contained"
						color="secondary"
						id="submit"
						fullWidth
						>
						Save
					</Button>
	}

	function onSubmit(data) {
		if (id) {
			editArtist(data)
		}
		else {
			addArtist(data)
		}
	}

	return (
			<Container>
			<Header name='Artist Detail'/>
				<Paper elevation={3} className={ classes.paper }>
				{ id ?
					<Typography color="textSecondary" component="h2" variant="h5" align="center">Artist Info</Typography> :
					<Typography color="textSecondary" component="h2" variant="h5" align="center">Add Artist</Typography>
				}
			<form onSubmit={handleSubmit(onSubmit)} id="form">
			<Grid container
					style={{marginTop: 20}}
					spacing={20}
					direction="column"
					alignItems="center">
				<Grid item xs={12}>
					<Controller
						as={TextField}
						disabled={edit ? false: true}
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
						disabled={edit ? false: true}
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
						disabled={edit ? false: true}
					/>	
				</Grid>
				<Grid item xs={3} style={{marginTop: 15, marginBottom: 15}}>
					<EditButton/>
				</Grid>
		</Grid>
				</form>
		</Paper>
		</Container>
	)}



export default ArtistDetail;
