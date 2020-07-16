import React from 'react'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'

import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { useForm, Controller } from 'react-hook-form'

import {
	Redirect
} from "react-router-dom";

function AddArtist(props) {
	
	const { register, handleSubmit, control, error } = useForm()
	
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
  );
}

export default AddArtist;
