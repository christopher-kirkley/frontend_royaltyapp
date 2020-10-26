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

import OrderModal from './OrderModal'

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

function Settings() {

	const { handleSubmit, control, setValue } = useForm()

	const classes = useStyles()

	const history = useHistory();


	function handleClose() {
		setOpen(false)
	}

	function handleClick() {
		setOpen(true)
	}

	function onSubmit(data) {
		console.log(data)
	}

	const [open, setOpen] = useState(true)

	const [orderSettings, setOrderSettings] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/settings/order-fee')
				.then(res => res.json())
				.then(json => setOrderSettings(json))
			}, [])

	return (
		<Container>
		{
			// <OrderModal
			// 	open={open}
			// 	handleClose={handleClose}
			// />
		}
		<Header name="Settings"/>
		<Grid container direction="row" >
			<Grid item xs={12}>
				<Paper className={classes.paper}> 
					<Grid container justify="space-between">
						<Grid item xs={3}>
							<Typography
								color="textSecondary"
								component="h6"
								variant="caption"
								align="left"
								gutterBottom
								>INCOME SOURCE SETTINGS
							</Typography>
						</Grid>
		{
						// <Grid item={3}>
						// 	<Button
						// 		id="add_order_fee"
						// 		size="small"
						// 		variant="contained"
						// 		color="secondary"
						// 		onClick={handleClick}
						// 		>
						// 	Add
						// 	</Button>
						// </Grid>
		}
					</Grid>
					<Divider style={{marginTop: 10, marginBottom: 10}}/>
						<form onSubmit={handleSubmit(onSubmit)} id="form">
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Distributor</TableCell>
										<TableCell>Fee</TableCell>
										<TableCell>Fee limit</TableCell>
										<TableCell>Percentage</TableCell>
										<TableCell>Active?</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
								{ orderSettings.map((row, index) =>
									<React.Fragment>
											<Controller
												type="hidden"
												as={TextField}
												name={`row[${index}].distributor_id`}
												id="distributor_id"
												defaultValue={row.distributor_id}
												control={control}
											/>
									<TableRow>
										<TableCell>
											<Controller
												as={TextField}
												name={`row[${index}].distributor_name`}
												id="distributor_name"
												defaultValue={row.distributor_name}
												control={control}
												disabled={true}
											/>
										</TableCell>
										<TableCell>
											<Controller
												as={TextField}
												name={`row[${index}].order_fee`}
												id="order_fee"
												defaultValue={row.order_fee}
												control={control}
											/>
										</TableCell>
										<TableCell>
											<Controller
												as={TextField}
												name={`row[${index}].order_limit`}
												id="order_limit"
												defaultValue={row.order_limit}
												control={control}
											/>
										</TableCell>
										<TableCell>
											<Controller
												as={TextField}
												name={`row[${index}].order_percentage`}
												id="order_percentage"
												defaultValue={row.order_percentage}
												control={control}
											/>
										</TableCell>
										<TableCell><Button>Edit</Button></TableCell>
									</TableRow>
									</React.Fragment>
								)
								}
								</TableBody>
							</Table>
				<Grid container justify="flex-end">
					<Grid item>
					<Button
						variant="contained"
						color="primary"
						size="small"
						type="submit"
						>Update
					</Button>
					</Grid>
				</Grid>
							</form>
				</Paper>
		</Grid>
		</Grid>
		</Container>
		
	)
}


export default Settings;
