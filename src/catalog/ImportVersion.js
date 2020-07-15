import React, { useState } from 'react';

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


function ImportVersion () {

	const [msg, setMsg] = useState('')

	function handleUpload(e) {
		const file = e.target.upload.files
		const formData = new FormData()
		formData.append('CSV', file[0])
		e.preventDefault()
		fetch('http://localhost:5000/catalog/import-version', {
				method: 'POST',
				body: formData
			})
		.then(resp => resp.json())
		.then(res => setMsg('1 file uploaded'))
		.catch(error => setMsg('Error uploading'))
	}

	return (
		<Container style={{border: '3px solid black'}}>
		<h2>Upload Version CSV</h2>
		<Grid container xs={12} spacing={4}>
			<Grid item>
			<form onSubmit={handleUpload} id="form">
				<div>
				<TextField id="version_to_upload" name="upload" type="file"/>	
				</div>
				<Button
					variant="contained"
					color="primary"
					id="version_upload"
					name="submit"
					type="submit"
				>Upload</Button>
			</form>
			<h3 id='version_msg'>{ msg }</h3>
		</Grid>
		</Grid>
		</Container>
	)}



export default ImportVersion;
