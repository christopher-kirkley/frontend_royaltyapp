import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'

function ArtistDetail () {
	const { id } = useParams()

	const [artist, setArtist] = useState([])
	
	const { register, handleSubmit, error, setValue } = useForm()
	
	useEffect(() => { 
		fetch(`http://localhost:5000/artists/${id}`)
		.then(res => res.json())
		.then(json => setArtist(json))
	}, [])

	useEffect(() => {
		setValue([
			{artist_name: artist.artist_name},
			{prenom: artist.prenom},
			{surnom: artist.surnom},
		])
	}, [artist])

		

	function onSubmit(data) {

	}
	

	return (
			<div>
				<h1 id="heading">Artist Detail</h1>
				<form onSubmit={console.log('y')}>
				<label>Artist Name:  
				<input type="text" name="artist_name" id="artist_name" ref={register}/>
				</label><br/>
				<label>Prenom:
				<input type="text" name="prenom" id="prenom" ref={register} />
				</label><br/>
				<label>Surnom:
				<input type="text" name="surnom" id="surnom" ref={register}/>
				</label><br/>
				<input id="update" value="Update" type="submit"/>
				</form>
		</div>
	)}



export default ArtistDetail;
