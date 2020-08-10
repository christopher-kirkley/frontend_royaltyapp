import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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

	const [startDate, setStartDate] = useState(new Date('2020-01-01T21:11:54'));
	const [endDate, setEndDate] = useState(new Date('2020-01-31T21:11:54'));

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
	}


	const previousBalanceChoices = previousBalances.map((previousBalance) =>
		{
			return (
				<option
				>{previousBalance.previous_balance}
				</option>
			)
	})

	useEffect(() => {
		fetch('http://localhost:5000/statements/view')
		.then(res => res.json())
		.then(json =>
			{
				if (json.length == 0) (
					setPreviousBalances([{'previous_balance': 'None'}])
				)
				else (
					setPreviousBalances(json))
			})
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
		          id="start-date"
		          label="End Date"
		          value={endDate}
		          onChange={handleEndDateChange}
		          KeyboardButtonProps={{
								            'aria-label': 'change date',
									          }}
							form="form"
		        />
						</Grid>
						</MuiPickersUtilsProvider>
						<Grid item xs={12}>
							<select>
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
					</Grid>
			</Container>
		)
	}


export default StatementGenerate
