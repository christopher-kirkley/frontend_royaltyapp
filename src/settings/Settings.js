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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Settings() {

	const classes = useStyles()

	const history = useHistory();

	const { handleSubmit, control, setValue } = useForm()

	function handleClick() {
	}

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
					id={distributor.id}
					value={distributor.id}
				>{distributor.distributor_name}
				</option>
			)
		})
	return (
		<Container>
		<Header name="Settings"/>
		<Grid container direction="row" >
			<Grid item xs={12}>
				<Paper className={classes.paper}> 
					<Grid container alignItems="center">
						<Grid item xs={2} >
							<Typography color="textSecondary"
								component="h6" variant="caption" align="left"
								gutterBottom>INCOME SETTINGS</Typography>
						<Divider style={{marginTop: 10, marginBottom: 10}}/>
						</Grid>
						<Grid container>
							<Grid xs={3}>
								<Typography variant="subtitle1">
								Distributor
								</Typography>
							</Grid>
							<Grid>
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
							<Grid xs={3}>
								<Typography variant="subtitle1">
								Fee per order
								</Typography>
							</Grid>
							<Grid xs={2}>
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
							<Grid xs={3}>
								<Typography variant="subtitle1">
								Percentage per Order
								</Typography>
							</Grid>
							<Grid xs={2}>
								<Controller
									as={TextField}
									name="order_percentage"
									id="order_percentage"
									defaultValue=""
									control={control}
								/>
							</Grid>
						</Grid>
				</Grid>
				

				</Paper>
			</Grid>
		</Grid>
		</Container>
	)
}


export default Settings;
