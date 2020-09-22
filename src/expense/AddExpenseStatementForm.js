import React, { useState } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

function AddExpenseStatementForm(props) {

	function handleUpload(e) {
		e.preventDefault()
		const file = e.target.upload.files
		const formData = new FormData()
		formData.append('file', file[0])
		fetch('http://localhost:5000/expense/import-statement', {
				method: 'POST',
				body: formData
			})
		.then(resp => resp.json())
		.then(res => setMsg('Uploaded!'))
		.then(res => {props.getMatchingErrors()})
		.then(res => {props.getPendingStatements()})
		.catch(error => setMsg('Error uploading'))
	}

	const [msg, setMsg] = useState('')
		
	return (
		<Container component="main" maxWidth="xs" spacing={4}>
			<Typography color="textSecondary" component="h2" variant="h5" align="center">
				Upload Expense Statement
			</Typography>
			<form onSubmit={handleUpload} id="form" style={{marginTop: 10, width: '100%'}}>
			<Grid container spacing={4}> 
			<Grid item xs={12}>
				<TextField fullWidth id="select_statement" name="upload" type="file"/>	
			</Grid>
			<Grid item xs={12}>
				<select id="source_statement">
				<option id="artist_source">Artist</option>
				<option id="catalog_source">Catalog</option>
				</select>
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					color="primary"
					id="upload_statement"
					name="submit"
					type="submit"
					fullWidth
				>Upload</Button>
			</Grid>
		</Grid>
		</form>
		</Container>
	)
}

export default AddExpenseStatementForm
