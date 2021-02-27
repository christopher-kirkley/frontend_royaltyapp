import React, { useState } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import SnackbarAlert from '../components/SnackbarAlert'

function ImportCatalog () {
	const history = useHistory()

	const [ success, setSuccess ] = useState(false)
	const [ error, setError ] = useState(false)

	function handleUpload(e) {
		const file = e.target.upload.files
		const formData = new FormData()
		formData.append('CSV', file[0])
		e.preventDefault()
		fetch('http://localhost:5000/statements/import-opening-balance', {
				method: 'POST',
				body: formData
			})
		.then(resp => resp.json())
		.then(res => {
			console.log(res)
			if (!res.errors) history.push('/statements')
			else history.push('/settings/opening-balance-fix')
				}

			)
		.catch(error => setError(true))
	}

	return (
		<Container>
		<Typography variant="h6" color="textSecondary" align="center">Import Opening Balance CSV</Typography>
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
					id="opening-balance-to-upload"
					name="upload"
					type="file"/>	
			</Grid>
			<Grid item xs={4}>
				<Button
					variant="contained"
					color="primary"
					id="opening-balance-upload"
					name="submit"
					type="submit"
					fullWidth
				>
				Upload
				</Button>
			</Grid>
		</Grid>

			</form>
		
		<SnackbarAlert
			success={success}
			error={error}
			setSuccess={setSuccess}
			setError={setError}
		/>
			
		</Container>
	)}



export default ImportCatalog;
