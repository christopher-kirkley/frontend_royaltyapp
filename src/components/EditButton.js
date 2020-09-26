import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	}
}))


function EditButton(props) {

	const history = useHistory();


	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
				<Button 
					size="small"
					type="submit"
					variant="contained"
					color="primary"
					id="submit"
					fullWidth
					form="form"
					>
					Save
				</Button>
			</Grid>
			<Grid item xs={2}>
				<Button 
					size="small"
					variant="contained"
					color="secondary"
					id="cancel"
					onClick={props.handleCancel}
					fullWidth
					>
					Cancel
				</Button>
			</Grid>
		</Grid>
	)
}

export default EditButton;
