import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

function DisplayMatchingErrors(props) {

	const { register, setValue, control, reset, handleSubmit } = useForm()


	const history = useHistory()


	function handleFix() {		
		history.push('/income/matching-errors')
	}

	return (
		<Container component="main" maxWidth="xs" spacing={4}>
		<div style={{marginTop: 10, display: "flex", flexDirection: "column",
								alignItems:"center", border: '3px solid black'}}>
			<Typography component="h2" variant="h5">Matching Errors</Typography>
			<Typography component="p" variant="p" id="matching_errors">You have <span id="error_number">{props.matchingErrors}</span> matching errors.</Typography>
			<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
			<Grid item xs={2}>
				<Button
					variant="contained"
					color="primary"
					id="fix_errors"
					name="submit"
					type="submit"
					onClick={handleFix}	
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
		</div>
		</Container>
	)
}

export default DisplayMatchingErrors

