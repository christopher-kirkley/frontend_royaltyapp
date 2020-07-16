import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
// import { useParams } from 'react-router-dom'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

function AddStatementForm() {

	const { register, setValue, control, reset, handleSubmit } = useForm()

	function handleUpload(e) {
		e.preventDefault()
		setMsg('Uploaded!')
	}

	const [msg, setMsg] = useState('')
		
	return (
		<Container component="main" maxWidth="xs" spacing={4}>
		<div style={{marginTop: 10, display: "flex", flexDirection: "column",
								alignItems:"center"}}>
			<Typography component="h2" variant="h5">
				Upload Income Statement
			</Typography>
			<form onSubmit={handleUpload} id="form" style={{marginTop: 10, width: '100%'}}>
			<Grid container  spacing={4}> 
			<Grid item xs={12}>
				<TextField fullWidth id="select_statement" name="upload" type="file"/>	
			</Grid>
			<Grid item xs={12}>
				<FormControl fullWidth>
				<InputLabel>Statement Source</InputLabel>
				<Select name="source_statement"> 
		          <MenuItem value={10} id='bandcamp'>Bandcamp</MenuItem>
		          <MenuItem value={10}>SD</MenuItem>
		          <MenuItem value={10}>SD Digital</MenuItem>
				</Select>
				</FormControl>
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
		</div>
		<Typography id="statement_message">{msg}</Typography>
		</Container>
	)
}

export default AddStatementForm

