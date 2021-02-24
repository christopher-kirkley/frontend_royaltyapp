import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	  MuiPickersUtilsProvider,
	  KeyboardTimePicker,
	  KeyboardDatePicker,
} from '@material-ui/pickers';


import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function StatementGenerate() {

	const classes = useStyles()

	const history = useHistory()

	const { register, handleSubmit, control, errors, setValue } = useForm()

	const [previousBalances, setPreviousBalances] = useState([]);

	const [msg, setMsg] = useState([]);

	const [index, setIndex] = useState('');


	function onSubmit(data) {
		var startDateSQL = data.start_date.toISOString().split('T')[0] 
		var endDateSQL = data.end_date.toISOString().split('T')[0] 

		fetch('http://localhost:5000/statements/generate', {
				method: 'POST',
				body: JSON.stringify(
					{
					'previous_balance_id': data.previous_balance_id,
					'start_date': startDateSQL,
					'end_date': endDateSQL
				}
				)
			})
		.then(resp => resp.json())
		.then(json => {
			var index = json['statement_index']
			fetch(`http://localhost:5000/statements/${index}/generate-summary`, {
				method: 'POST'
			})
		})
		.then(res => history.push('/statements/'))
	}

	const previousBalanceChoices = previousBalances.map((previousBalance) =>
		{
			return (
				<option
					id={previousBalance.statement_balance_table}
					value={previousBalance.id}
				>{previousBalance.statement_balance_table}
				</option>
			)
	})

	useEffect(() => {
		fetch('http://localhost:5000/statements/view-balances')
		.then(res => res.json())
		.then(json => (setPreviousBalances(json), console.log(json)))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	return (
			<Container>
				<Header name='Generate Statement'/>
					<Paper elevation={3} className={classes.paper}>
						<Typography variant="h6" color="textSecondary" align="center" gutterBottom>Generate Statement</Typography>
						<Grid container spacing={2} alignItems="center" direction="column">
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={7}>
								<Controller
									name="start_date"
									control={control}
									rules={{ required: true }}
									defaultValue={null}
									as={
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											id="start-date"
											label="Start Date"
											KeyboardButtonProps={{
																		'aria-label': 'change date',
																		}}
										/>
									}
								/>
							</Grid>
							<Grid item xs={7}>
								<Controller
									name="end_date"
									control={control}
									defaultValue={null}
									rules={{ required: true }}
									as={
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											id="end-date"
											label="End Date"
											KeyboardButtonProps={{
																		'aria-label': 'change date',
																		}}
										/>
									}
								/>
							</Grid>
							</MuiPickersUtilsProvider>
							<Grid item xs={12}>
								<InputLabel htmlFor="previous_balance_id">Previous Balance</InputLabel>
								<Controller
									name="previous_balance_id"
									control={control}
									defaultValue="0"
									as={
										<NativeSelect
											id="previous_balance_id"
											>
											{previousBalanceChoices}
											<option id="none" value="0">None</option>
										</NativeSelect>
									}
								/>
							</Grid>
					<Grid item xs={12}>

					<form onSubmit={handleSubmit(onSubmit)} id="form">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						id="submit"
						>
						Submit
						</Button>
					</form>
					</Grid>
					<Grid item>
					<Typography id="message">{msg}</Typography>
					</Grid>
					</Grid>
				</Paper>
			</Container>
		)
	}


export default StatementGenerate
