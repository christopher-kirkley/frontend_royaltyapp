import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

import {
	Redirect
} from "react-router-dom";

function AddArtist() {
	const [artist_name, setArtistName] = useState('')
	const [prenom, setPrenom] = useState('')
	const [surnom, setSurnom] = useState('')

	const [submit, setSubmit] = useState(false)
	
	function handleSubmit(e) {
		e.preventDefault()
		fetch('http://localhost:5000/artists', {
			method: 'POST',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(json => console.log(json))
		// .then(json => this.setState({'artists': json}))
		// .then(setSubmit(true))onsole.log(this.state.artists)
	};

	if (submit === true) {
			return <Redirect to='/artist' />
	}


  return (
			<form onSubmit={handleSubmit} id="form">
				<label htmlFor="artist_name">Artist Name</label>
				<input type="text" name="artist_name" id="artist_name"
					onChange={e => setArtistName(e.target.value)}/>
				<label htmlFor="prenom">Prenom</label>
				<input type="text" name="prenom" id="prenom"
					onChange={e => setPrenom(e.target.value)}/>
				<label htmlFor="surnom">Surnom</label>
				<input type="text" name="surnom" id="surnom"
					onChange={e => setSurnom(e.target.value)}/>
				<button type="submit" id="submit">Submit</button>
			</form>
  );
}

export default AddArtist;
