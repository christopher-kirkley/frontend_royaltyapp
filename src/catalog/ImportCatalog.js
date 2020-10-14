import React, { useState } from 'react';

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function ImportCatalog () {

	const [ success, setSuccess ] = useState(false)
	const [ error, setError ] = useState(true)

	function handleUpload(e) {
		const file = e.target.upload.files
		const formData = new FormData()
		formData.append('CSV', file[0])
		e.preventDefault()
		fetch('http://localhost:5000/catalog/import-catalog', {
				method: 'POST',
				body: formData
			})
		.then(resp => resp.json())
		.then(res => setSuccess(true))
		.catch(error => setError(true))
	}

	return (
		<Container>
		<Typography variant="h6" color="textSecondary" align="center">Upload Catalog CSV</Typography>
		<form onSubmit={handleUpload} id="form">
		<Grid 
			container xs={12}
			spacing={4}
			alignContent="center"
			justify="center"
			style={{marginTop: 10}}
		>
			<Grid item xs={9} alignContent="center" style={{textAlign: "center"}}>
				<TextField
					id="catalog_to_upload"
					name="upload"
					type="file"/>	
			</Grid>
			<Grid item xs={4}>
				<Button
					variant="contained"
					color="primary"
					id="catalog_upload"
					name="submit"
					type="submit"
					fullWidth
				>
				Upload
				</Button>
			</Grid>
		</Grid>

			</form>
		<Snackbar open={success} autoHideDuration={6000}>
			<Alert severity="success">
			Uploaded!
			</Alert>
		</Snackbar>
		<Snackbar open={error} autoHideDuration={6000}>
			<Alert severity="error">
			Error
			</Alert>
		</Snackbar>
			
		</Container>
	)}



export default ImportCatalog;
