import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'

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
			<FormGroup onSubmit={handleSubmit(onSubmit)} id="form">
				<Input type="text" name="artist_name" id="artist_name" ref={register}/>
				<InputLabel htmlFor="artist_name">Artist Name</InputLabel>
				<Input type="text" name="prenom" id="prenom" ref={register}/>
				<InputLabel htmlFor="prenom">Prenom</InputLabel>
				<Input type="text" name="surnom" id="surnom" ref={register}/>
				<InputLabel htmlFor="surnom">Surnom</InputLabel>
				<br/>
				<Button type="submit" variant="contained" color="primary" id="submit">Submit</Button>
			</FormGroup>
  );
}

export default AddArtist;
