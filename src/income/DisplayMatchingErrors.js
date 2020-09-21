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


	return (
		<React.Fragment>
		<Grid container xs={12}>
			<Grid item xs={6}>
		<Typography color="textSecondary" component="h2" variant="h5" align="center" gutterBottom>
				Matching Errors
				</Typography>
		<Grid container direction="column" alignItems="center">
				<Typography component="p" variant="p" id="matching_errors" >You have <span id="error_number">{props.matchingErrors}</span> matching errors.</Typography>
				<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
			<Grid item xs={12}>
				<Button
					variant="contained"
					color="primary"
					id="fix_errors"
					name="submit"
					type="submit"
					fullWidth
					onClick={props.goToMatchingErrorPage}	
				>Fix</Button>
		</Grid>
		</Grid>
		</Grid>
		</Grid>
		</React.Fragment>
	)
}

export default DisplayMatchingErrors

