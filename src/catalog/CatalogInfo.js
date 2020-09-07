import React, { useState, useEffect } from 'react'

import { useForm, Controller, defaultValue } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import Header from '../components/Header'

function CatalogInfo() {

	const [catalog, setCatalog ] = useState('')

	const { id } = useParams()

	useEffect(() => { 
		if (id) {
			fetch(`http://localhost:5000/catalog/${id}`)
			.then(res => res.json())
			.then(json => setCatalog(json))
	}}, [])

	useEffect(() => {
		const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
		setValue([
			{catalog_number: catalog.catalog_number},
			{catalog_name: catalog.catalog_name},
			{artist_name: artist_name},
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
		<MenuItem value={artist.id}>{artist.artist_name}</MenuItem>
	)

	function onSubmit(data) {

		if (id) {
			const catalog_number = data.catalog_number
			const catalog_name = data.catalog_name
			const artist_id = data.artist_id
			// send json to update
			fetch(`http://localhost:5000/catalog/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ catalog_number, catalog_name, artist_id }),
			})
			.then(res => res.json())
		}
		else {
		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id
		
		fetch('http://localhost:5000/catalog', {
			method: 'POST',
			body: JSON.stringify({ catalog_number, catalog_name, artist_id })
		})
		.then(res => res.json())
	}
	}
	

	return (
		<Container>
		<Typography variant="h6" color="textSecondary" align="center">Catalog Info</Typography>
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<Controller
				as={TextField}
				control={control}
				name="catalog_number"
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Catalog Number"
				id="catalog_number"
				autoComplete="catalog number"
				autoFocus
				defaultValue=""
			/>
			<Controller
				as={TextField}
				control={control}
				name="catalog_name"
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Catalog Name"
				id="catalog_name"
				autoComplete="catalog name"
				autoFocus
				defaultValue=""
			/>
			<InputLabel shrink id="select">Catalog Artist</InputLabel>
			<Select labelId="select" name="artist_id" id="artist_name" ref={register}>
			{artistChoices}
			</Select>
		{
			// <Controller
			// 	as={
			// 		<Select labelId="select" id="artist_name" id="artist_id" ref={register}>
			// 		{artistChoices}
			// 		</Select>
			// 		}
			// 	control={control}
			// 	fullWidth
			// 	id="select"
			// 	name="artist_id"
			// />
			
		}
			<Button
				style={{marginTop: 4}}
				variant="contained"
				fullWidth
				color="primary"
				type="submit"
				id="submit"
				name="submit">
			Submit
			</Button>
		</form>
		</Container>
	)
}

export default CatalogInfo
