import React, { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'

function AddStatementForm(props) {

	const { register, control, handleSubmit } = useForm()

	function onSubmit(data) {
	
		const formData = new FormData()

		formData.append('file', data.file_upload[0])
		formData.append('statement_source', data.source_statement)
		fetch('http://localhost:5000/income/import-sales', {
				method: 'POST',
				body: formData
			})
		.then(resp => resp.json())
		.then(res => {props.getMatchingErrors()})
		.then(res => {props.getTrackMatchingErrors()})
		.then(res => {props.getPendingStatements()})
		.catch(error => setMsg('Error uploading'))
	}

	const [msg, setMsg] = useState('')

	const [distributors, setDistributors] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/income/distributors')
				.then(res => res.json())
				.then(json => setDistributors(json))
			}, [])

	const distributorChoices = distributors.map((distributor) =>
		{
			return (
				<option
					id={distributor.distributor_name}
					value={distributor.distributor_name}
				>{distributor.distributor_name}
				</option>
			)
		})

		
	return (
		<Container component="main" maxWidth="xs" spacing={4}>
			<Typography color="textSecondary" component="h2" variant="h5" align="center">
				Upload Income Statement
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} id="form" style={{marginTop: 10, width: '100%'}}>
			<Grid container style={{marginTop: 20}} spacing={4} direction="column" alignItems="center"> 
				<Grid item xs={12} style={{ textAlign: "center" }}>
						<input
						name="file_upload"
						required
						id="file_upload"
						autoComplete="select statement"
						autoFocus
						ref={register}
						type="file"
						defaultValue=""
					/>
				</Grid>
				<Grid item xs={4}>
					<Controller
						as={
							<NativeSelect>
								{ distributorChoices }
							</NativeSelect>
							}
						name="source_statement"
						id="source_statement"
						control={control}
						defaultValue="bandcamp"
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
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

export default AddStatementForm

