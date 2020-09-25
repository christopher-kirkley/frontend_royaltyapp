import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
import EditButton from '../components/EditButton'

import ArtistForm from './ArtistForm'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	}
}))

function ArtistDetail () {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])

	const [edit, setEdit] = useState(false)
	
	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/artists/${id}`)
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


	function onSubmit(data) {
		if (id) {
			editArtist(data)
		}
		else {
			addArtist(data)
		}
	}

	function handleEdit() {
		setEdit(!edit)
	}

	function handleCancel() {
		handleEdit()
	}

	return (
			<Container>
			<Header name='Artist Detail'/>
				<Grid container justify="space-between">
					<Grid item xs={2}>
						<ToggleButtonGroup
							value={edit}
							exclusive
							onChange={handleEdit}
						>
							<ToggleButton
								id="view"
								value={false}
							>
							View
							</ToggleButton>
							<ToggleButton
								id="edit"
								value={true}
							>
							Edit
							</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
					<Grid item xs={2} >
					{ edit ?
						<EditButton
							edit={edit}
							handleEdit={handleEdit}
							handleCancel={handleCancel}
							/> : null }
					</Grid>
				</Grid>
				<Grid item={12}>
					<Paper elevation={3} className={classes.paper}>
					<ArtistForm onSubmit={onSubmit} id={id} edit={edit} />
					</Paper>
				</Grid>
		</Container>
	)}


export default ArtistDetail;
