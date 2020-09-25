import React, { useState, useEffect } from 'react'

import { useForm, Controller, defaultValue } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'

import Header from '../components/Header'
import ConditionalButton from '../components/ConditionalButton'

function CatalogForm(props) {

	const [catalog, setCatalog ] = useState('')

	const [artistId, setArtistId] = useState('1')

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => setCatalog(json))


	}}, [])

	useEffect(() => {
		const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
		const artist_id = catalog && catalog.artist ? catalog.artist.id : 1;
		
		setValue([
			{catalog_number: catalog.catalog_number},
			{catalog_name: catalog.catalog_name},
			{artist_name: artist_name},
			{artist_id: artist_id},
		])
	}, [catalog])
	
	const { register, handleSubmit, setValue, control } = useForm()

	const [artists, setArtists] = useState([])
	
	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	const artistChoices = artists.map((artist, i) =>
		<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	)

	
	return (
		<Container>
		<Typography variant="h6" color="textSecondary" align="center">Catalog Info</Typography>
		<form onSubmit={handleSubmit(props.onSubmit)} id="form">
			<Grid container spacing={1} alignItems="center" justify="center">
				<Grid item xs={7}>
					<Controller
						as={TextField}
						control={control}
						name="catalog_number"
						required
						fullWidth
						label="Catalog Number"
						id="catalog_number"
						autoComplete="catalog number"
						autoFocus
						defaultValue=""
						disabled={props.edit ? false: true}
					/>
				</Grid>
				<Grid item xs={7}>
					<Controller
						as={TextField}
						control={control}
						name="catalog_name"
						required
						fullWidth
						label="Title"
						id="catalog_name"
						autoComplete="catalog name"
						autoFocus
						defaultValue=""
						disabled={props.edit ? false: true}
					/>
				</Grid>
				<Grid item xs={7}>
					<InputLabel htmlFor="catalog_artist">Primary Artist</InputLabel>
					<Controller
						name="artist_id"
						required
						id="artist_name"
						as={<NativeSelect>
								{artistChoices}
								</NativeSelect>}
						control={control}
						fullWidth
						disabled={props.edit ? false: true}
					/>
				</Grid>
		</Grid>
		</form>
		</Container>
	)
}

export default CatalogForm
