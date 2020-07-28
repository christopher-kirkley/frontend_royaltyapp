import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

function UploadedStatements(props) {

	const { register, setValue, control, reset, handleSubmit } = useForm()


	const history = useHistory()


	const pendingList = props.pendingStatements.map((pendingStatement) =>
		{
			return (
				<ListItem
					id="pending_statement"
				>{pendingStatement.statement}
				</ListItem>
			)
	})

	return (
		<Container component="main" maxWidth="xs" spacing={4}>
		<div style={{marginTop: 10, display: "flex", flexDirection: "column",
								alignItems:"center", border: '3px solid black'}}>
			<Typography component="h2" variant="h5">Uploaded Statements</Typography>
		<Grid item xs={2}>
			<List>
				{pendingList}
			</List>
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

export default UploadedStatements

