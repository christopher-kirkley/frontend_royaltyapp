import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form'

import {
	Redirect
} from "react-router-dom";

function AddArtist(props) {
	const { register, handleSubmit, error } = useForm()
	
	function onSubmit(data) {
		
		const artist_name = data.artist_name
		const surnom = data.surnom
		const prenom = data.prenom

		fetch('http://localhost:5000/artists', {
			method: 'POST',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(json => props.onChange())
	}


  return (
			<div>
			<p>Add Artist</p>
			<form onSubmit={handleSubmit(onSubmit)} id="form">
				<label htmlFor="artist_name">Artist Name</label>
				<input type="text" name="artist_name" id="artist_name" ref={register}/><br/>
				<label htmlFor="prenom">Prenom</label>
				<input type="text" name="prenom" id="prenom" ref={register}/><br/>
				<label htmlFor="surnom">Surnom</label>
				<input type="text" name="surnom" id="surnom" ref={register}/><br/>
				<button type="submit" id="submit">Submit</button>
			</form>
			</div>
  );
}

export default AddArtist;
