import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
// import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'

function AddStatementForm() {

	const { register, setValue, control, reset, handleSubmit } = useForm()

	function onSubmit() {
	}

	function handleUpload() {
	}

		
	return (
		<Container>
		<h2>Upload Income Statement</h2>
		<p>This is a place to upload CSV of your income statement.</p>
		<Grid container xs={12} spacing={4}>
			<form onSubmit={handleUpload} id="form">
			<Grid item>
				<TextField id="catalog_to_upload" name="upload" type="file"/>	
			</Grid>
			<Grid item>
				<Select>
					<option>Bandcamp</option>
				</Select>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					id="catalog_upload"
					name="submit"
					type="submit"
				>Upload</Button>
			</Grid>
			</form>
		</Grid>
		</Container>
	)
}

export default AddStatementForm

