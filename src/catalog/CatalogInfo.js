import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'

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
			{artist_name: artist_name}
		])
	}, [catalog])
	
	const { register, handleSubmit, setValue } = useForm()

	const [artists, setArtists] = useState([])
	
	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	const artistChoices = artists.map((artist, i) =>
		<option value={artist.id}>{artist.artist_name}</option>
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
		<Container style={{border: '3px solid black'}}>
		<h2>Catalog Info</h2>
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<InputLabel htmlFor="catalog_number">Catalog Number</InputLabel>
			<Input type="text" name="catalog_number" id="catalog_number" inputRef={register}/><br/>
			<InputLabel htmlFor="catalog_name">Catalog Name</InputLabel>
			<Input type="text" name="catalog_name" id="catalog_name" inputRef={register}/><br/>
			<InputLabel htmlFor="catalog_artist">Catalog Artist</InputLabel>
			<select id="artist_name" name="artist_id" ref={register}>
				{artistChoices}
			</select><br/>
		<Button variant="contained" color="primary" type="submit" id="submit" name="submit">
		Submit
		</Button>
		</form>
		</Container>
	)
}

export default CatalogInfo
