import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@material-ui/core/Button';

function AddVersionForm() {

	const { register, handleSubmit } = useForm()

	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	function onSubmit(data) {

		console.log(data)
		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id
		

		fetch('http://localhost:5000/catalog', {
			method: 'POST',
			body: JSON.stringify({ catalog_number, catalog_name, artist_id })
		})
		.then(res => res.json())
		.then(json => props.onChange())
	}

	const artistChoices = artists.map((artist, i) =>
		<option value={artist.id}>{artist.artist_name}</option>
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<label htmlFor="catalog_number">Catalog Number</label>
			<input type="text" name="catalog_number" id="catalog_number" ref={register}/><br/>
			<label htmlFor="catalog_name">Catalog Name</label>
			<input type="text" name="catalog_name" id="catalog_name" ref={register}/><br/>
			<label htmlFor="catalog_artist">Catalog Artist</label>
			<select id="artist_id" name="artist_id" ref={register}>
				{artistChoices}
			</select><br/>
			<Button type="submit" id="submit" name="submit">Submit</Button>
		</form>
	)
}

export default AddCatalogItem

