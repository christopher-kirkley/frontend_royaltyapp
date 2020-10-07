import React, { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Modal from '@material-ui/core/Modal';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
		paper: {
					position: 'absolute',
					width: 400,
					backgroundColor: theme.palette.background.paper,
					border: '2px solid #000',
					boxShadow: theme.shadows[5],
					padding: theme.spacing(2, 4, 3),
				},
}));


function UpdateModal(props) {

	const { register, control, handleSubmit } = useForm()

	const classes = useStyles();

	const [upcs, setUpcs] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/version')
				.then(res => res.json())
				.then(json => setUpcs(json))
			}, [])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.version_number} : {upc.upc}
				</option>
			)
		})

	const numSelect = props.selected.length


	const body = (
			<div style={{transform: "translate(100%, 100%)"}} className={classes.paper}>
				<Typography variant="h6">Update Selected</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
					<Typography variant="subtitle1">UPC: { numSelect > 1 ? 'Various' : props.selected[0].upc_id }</Typography>
					</Grid>
					<Grid item xs={12}>
					<Typography variant="subtitle1">Distributor: { numSelect > 1 ? 'Various' : props.selected[0].distributor }</Typography>
					</Grid>
					<Grid item>
						<NativeSelect
							id="new_upc">
							{upcChoices}
						</NativeSelect>
					</Grid>
					<Grid container item>
						<Grid item xs={7}>
							<Button
								size="small"
								onClick={props.handleClose}
							>Cancel</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								variant="contained"
								color="primary"
								size="small"
							>Update</Button>
						</Grid>
						<Grid item xs={2}>
							<Button
								variant="contained"
								color="secondary"
								size="small"
							>Match</Button>
						</Grid>
					</Grid>
				</Grid>
			</div>
			);
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
		>
		{body}
		</Modal>
	)
}

export default UpdateModal

