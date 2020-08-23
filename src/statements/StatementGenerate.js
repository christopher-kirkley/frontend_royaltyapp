import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	  MuiPickersUtilsProvider,
	  KeyboardTimePicker,
	  KeyboardDatePicker,
} from '@material-ui/pickers';

import Header from '../components/Header'

function StatementGenerate() {

	const history = useHistory()

	const [startDate, setStartDate] = useState(new Date(2020, 0, 1));
	const [endDate, setEndDate] = useState(new Date(2020, 0, 31));

	const [previousBalances, setPreviousBalances] = useState([]);

	const [msg, setMsg] = useState([]);


	const handleStartDateChange = (date) => {
				setStartDate(date);
			};

	const handleEndDateChange = (date) => {
				setEndDate(date);
			};

	function handleSubmit(e) {
		e.preventDefault()
		var previous_balance_id = e.target.previous_balance_id.value
		var startDateSQL = startDate.toISOString().split('T')[0] 
		var endDateSQL = endDate.toISOString().split('T')[0] 
		fetch('http://localhost:5000/statements/generate', {
				method: 'POST',
				body: JSON.stringify(
					{
					'previous_balance_id': previous_balance_id,
					'start_date': startDateSQL,
					'end_date': endDateSQL
				}
				)
			})
		.then(resp => resp.json())
		.then(json => {
			var statementIndex = json['statement_index']
			fetch(`http://localhost:5000/statements/${statementIndex}/generate-summary`, {
				method: 'POST'
			})
		})
		.then(res => setMsg('Uploaded!'))
		.catch(error => setMsg('Error uploading'))
	}



	const previousBalanceChoices = previousBalances.map((previousBalance) =>
		{
			return (
				<option
					id={previousBalance.statement_balance_name}
					value={previousBalance.id}
				>{previousBalance.statement_balance_name}
				</option>
			)
	})

	useEffect(() => {
		fetch('http://localhost:5000/statements/view-balances')
		.then(res => res.json())
		.then(json => setPreviousBalances(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	return (
			<Container>
				<Header name='Generate Statement'/>
		      <Grid container justify="space-around">
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid item xs={12}>
		        <KeyboardDatePicker
		          disableToolbar
		          variant="inline"
		          format="MM/dd/yyyy"
		          margin="normal"
		          id="start-date"
		          label="Start Date"
		          value={startDate}
		          onChange={handleStartDateChange}
		          KeyboardButtonProps={{
								            'aria-label': 'change date',
									          }}
		        />
						</Grid>
						<Grid item xs={12}>
		        <KeyboardDatePicker
		          disableToolbar
		          variant="inline"
		          format="MM/dd/yyyy"
		          margin="normal"
		          id="end-date"
		          label="End Date"
		          value={endDate}
		          onChange={handleEndDateChange}
		          KeyboardButtonProps={{
								            'aria-label': 'change date',
									          }}
		        />
						</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12}>
							<select
								id="previous_balance_id"
								form="form"
								>
							<option
								id='none'
								value='0'>
							None
							</option>
							{previousBalanceChoices}
							</select>
						</Grid>
					</Grid>
					<Grid item>
					<form
						onSubmit={handleSubmit}
						id="form"
					>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						id="submit"
						>
						Submit
						</Button>
					</form>
					<Grid item>
					<Typography id="message">{msg}</Typography>
					</Grid>
					</Grid>
			</Container>
		)
	}


export default StatementGenerate
