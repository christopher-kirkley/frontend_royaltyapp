import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';

function UploadedStatements(props) {

	const { register, setValue, control, reset, handleSubmit } = useForm()

	const history = useHistory()

	const pendingList = props.pendingStatements.map((pendingStatement) =>
		{
			return (
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<DescriptionIcon/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						id="pending_statement"
					  primary={pendingStatement.statement}
					/>
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			)
	})

	return (
		<React.Fragment>
		<Typography color="textSecondary" component="h2" variant="h5" align="center" gutterBottom>
		 Pending Imports
		</Typography>
		<Grid container alignItems="center" justify="center" spacing={2}>
			<Grid item xs={7}>
				<Paper style={{paddingLeft: 80, paddingRight: 80, paddingTop: 10, paddingBottom: 10}}>
				<List>
					{pendingList}
				</List>
				</Paper>
			</Grid>
			<Grid item xs={7}>
				<Alert severity="warning">
					<AlertTitle>Matching Errors</AlertTitle>
				  You have <strong id="error_number">{props.matchingErrors}</strong> matching errors.
				<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
				</Alert>
			</Grid>
		</Grid>
		<Grid container justify="center" spacing={2}>
			<Grid item xs={2}>
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
			<Grid item xs={2}>
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
		</React.Fragment>
	)
}

export default UploadedStatements

