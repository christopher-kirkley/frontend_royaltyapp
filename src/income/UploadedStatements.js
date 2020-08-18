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
		<Container spacing={4}>
			<Typography component="h2" variant="h5" gutterBottom>Uploaded Statements</Typography>
		<Grid item xs={12}>
			<List>
				{pendingList}
			</List>
		</Grid>
		<Grid item xs={12}>
			<Button
				variant="contained"
				color="primary"
				id="process_statements"
				name="submit"
				type="submit"
				fullWidth
				onClick={props.processPending}
			>Process</Button>
		</Grid>
		</Container>
	)
}

export default UploadedStatements

