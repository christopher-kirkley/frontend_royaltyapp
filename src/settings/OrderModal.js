import React, { useState, useEffect } from 'react';

import Header from "../components/Header";

import { Redirect } from 'react-router-dom'
import {
	NavLink
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useForm, Controller } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import NativeSelect from '@material-ui/core/NativeSelect'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Modal from '@material-ui/core/Modal'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
		paper: {
			padding: 20,
		},
		modal: {
					position: 'absolute',
					width: 400,
					backgroundColor: theme.palette.background.paper,
					border: '2px solid #000',
					boxShadow: theme.shadows[5],
					padding: theme.spacing(2, 4, 3),
				},
}))

function OrderModal(props) {

	const { handleSubmit, control, setValue } = useForm()

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
					value={distributor.id}
				>{distributor.distributor_name}
				</option>
			)
		})

	const classes = useStyles()

	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
		>
			<div style={{transform: "translate(80%, 50%)"}} className={classes.modal}>
				<Grid container alignItems="center">
					<Grid item xs={6}>
						<Typography variant="subtitle1">Distributor</Typography>
					</Grid>
					<Grid item xs={4}>
						<Controller
							as={
								<NativeSelect>
									{distributorChoices}
								</NativeSelect>
							}
							name="distributor"
							id="distributor"
							defaultValue=""
							control={control}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid xs={6}>
						<Typography variant="subtitle1">
						Fee per order
						</Typography>
					</Grid>
					<Grid xs={4}>
						<Controller
							as={TextField}
							name="order_fee"
							id="order_fee"
							defaultValue=""
							control={control}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid xs={6}>
						<Typography variant="subtitle1">
						Fee Limit
						</Typography>
					</Grid>
					<Grid xs={4}>
						<Controller
							as={TextField}
							name="fee_limit"
							id="fee_limit"
							defaultValue=""
							control={control}
						/>
					</Grid>
				</Grid>
				<Grid container>
					<Grid xs={6}>
						<Typography variant="subtitle1">
						Percentage per Order
						</Typography>
					</Grid>
					<Grid xs={4}>
						<Controller
							as={TextField}
							name="order_percentage"
							id="order_percentage"
							defaultValue=""
							control={control}
						/>
					</Grid>
				</Grid>
				<Grid container item style={{marginTop: 30}} justify="flex-end">
					<Grid item xs={3}>
						<Button
							size="small"
							variant="outlined"
							color="secondary"
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
				</Grid>
			</div>
		</Modal>
	)
}

export default OrderModal;
