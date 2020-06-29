import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

function AddCatalogItem() {

	const { register, handleSubmit } = useForm()

	const [artists, setArtists] = useState([])
	
	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	function onSubmit() {
	}

	const artistChoices = artists.map((artist, i) =>
		<option>{artist.artist_name}</option>
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} id="form">
			<label htmlFor="artist_name">Catalog Title</label>
			<input type="text" name="catalog-title" id="catalog-title" ref={register}/><br/>
			<label htmlFor="prenom">Catalog Artist</label>
			<select>
				{artistChoices}
			</select><br/>
			<button type="submit" id="submit">Submit</button>
		</form>
	)
}

export default AddCatalogItem
