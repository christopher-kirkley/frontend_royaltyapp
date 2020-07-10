import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

function ArtistDetail () {
	const { id } = useParams()

	const [artist, setArtist] = useState([])
	
	const { register, handleSubmit, control, error, setValue } = useForm()
	
	const history = useHistory();

	// post if new, put if edit
	
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
		// send json to update
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

	return (
			<div>
				<h1 id="heading">Artist Detail</h1>
			<form onSubmit={handleSubmit(onSubmit)} id="form">
				<Controller
					as={TextField}
					name="artist_name"
					id="artist_name"
					control={control}
					label="Artist Name"
				/>
				<Controller
					as={TextField}
					name="prenom"
					id="prenom"
					control={control}
					label="Prenom"
				/>	
				<Controller
					as={TextField}
					name="surnom"
					id="surnom"
					control={control}
					label="Surnom"
				/>	
				<br/>
				<Button type="submit" variant="contained" color="primary" id="submit">Submit</Button>
			</form>
		</div>
	)}



export default ArtistDetail;
