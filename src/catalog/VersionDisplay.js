import React, { useState } from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	modal: {
		position: "absolute",
		width: 900,
		backgroundColor: "white",
		border: '2px solid #000',
		boxShadow: theme.shadows[5],

	}
}))

function rand() {
	  return Math.round(Math.random() * 20) - 10;
}


function getModalStyle() {
	const top = 50 + rand()
	const left = 50 + rand()

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	}}


function VersionDisplay(props) {

	const classes = useStyles()

	const [open, setOpen] = useState(false)

	const [modalStyle] = useState(getModalStyle)

	const history = useHistory()

	const body = (
		<div style={modalStyle} className={classes.modal}>
		<Button>Close</Button>
		</div>
	)

	function handleOpen() {
		setOpen(true)
	}

	function handleClose() {
		setOpen(false)
	}

	return (
		<Grid container justify="space-between">
			<Grid item xs={1} >
				<Typography color="textSecondary" component="h6" variant="caption" align="center">VERSIONS</Typography>
			</Grid>
			<Grid container spacing={1} item xs={1} >
				<Grid item>
				<Button
					id="add_version"
					size="small"
					variant="contained"
					color="secondary"
					onClick={handleOpen}
					>
				Add
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
				>
				{body}
				</Modal>
			</Grid>
	</Grid>

		<Grid item xs={12}>
		Click to add versions

		</Grid>

	</Grid>
	)
	}


export default VersionDisplay

