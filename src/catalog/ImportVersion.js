import React, { useState } from 'react';

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
		<Container>
		<Typography variant="h6" color="textSecondary" align="center">Upload Version CSV</Typography>
			<form onSubmit={handleUpload} id="form">
			<Grid 
				container xs={12}
				spacing={4}
				alignContent="center"
				justify="center"
				style={{marginTop: 10}}
			>
				<Grid item xs={9} alignContent="center" style={{textAlign: "center"}}>
				<TextField id="version_to_upload" name="upload" type="file"/>	
				</Grid>
				<Grid item xs={4} alignContent="center" style={{textAlign: "center"}}>
					<Button
						variant="contained"
						color="primary"
						id="version_upload"
						name="submit"
						type="submit"
						fullWidth
					>Upload</Button>
				</Grid>
			</Grid>
			</form>
			<h3 id='version_msg'>{ msg }</h3>
		</Container>
	)}



export default ImportVersion;
