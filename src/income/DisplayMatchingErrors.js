import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

function DisplayMatchingErrors() {

	const { register, setValue, control, reset, handleSubmit } = useForm()

	const [ matchingErrors, setMatchingErrors ] = useState(0)

	useEffect(() => { 
			fetch(`http://localhost:5000/income/matching-errors`)
			.then(res => res.json())
			.then(json => setMatchingErrors(json))
	}, [])

	function handleUpload(e) {
		e.preventDefault()
		// const file = e.target.upload.files
		// const formData = new FormData()
		// formData.append('file', file[0])
		// formData.append('statement_source', 'bandcamp')
		// fetch('http://localhost:5000/income/import-sales', {
		// 		method: 'POST',
		// 		body: formData
		// 	})
		// .then(resp => resp.json())
		// .then(res => setMsg('Uploaded!'))
		// .catch(error => setMsg('Error uploading'))
	}

	return (
		<Container component="main" maxWidth="xs" spacing={4}>
		<div style={{marginTop: 10, display: "flex", flexDirection: "column",
								alignItems:"center", border: '3px solid black'}}>
			<Typography component="h2" variant="h5">Matching Errors</Typography>
			<Typography component="p" variant="p">You have {matchingErrors} matching errors.</Typography>
			<form onSubmit={handleUpload} id="form" style={{marginTop: 10, width: '100%'}}>
			<Grid item xs={2}>
				<Button
					variant="contained"
					color="primary"
					id="fix_errors"
					name="submit"
					type="submit"
				>Fix</Button>
		</Grid>
			<Grid item xs={2}>
				<Button
					variant="contained"
					color="primary"
					id="process_errors"
					name="submit"
					type="submit"
				>Process</Button>
		</Grid>
		</form>
		</div>
		</Container>
	)
}

export default DisplayMatchingErrors

