import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';


function AddArtist(params) {
	const [artist_name, setArtistName] = useState('')
	const [prenom, setPrenom] = useState('')
	const [surnom, setSurnom] = useState('')
	
	function submit(e) {
		e.preventDefault()
		fetch('http://localhost:5000/artists', {
			method: 'POST',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		}).then(params.setValue(false))
	};


  return (
			<form onSubmit={submit} id="form">
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
