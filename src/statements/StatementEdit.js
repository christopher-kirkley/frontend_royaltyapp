import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import {
	  MuiPickersUtilsProvider,
	  KeyboardTimePicker,
	  KeyboardDatePicker,
} from '@material-ui/pickers';

import Header from '../components/Header'

function StatementEdit() {

	const history = useHistory()

	const { id } = useParams()

	const [msg, setMsg] = useState([]);
	const [versions, setVersions] = useState([]);
	const [summary, setSummary] = useState([]);
	const [previousBalances, setPreviousBalances] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/statements/${id}/versions`)
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
	}, [])

	
	useEffect(() => {
		fetch('http://localhost:5000/statements/view-balances')
		.then(res => res.json())
		.then(json => setPreviousBalances(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	useEffect(() => { 
		fetch(`http://localhost:5000/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				setSummary(json['summary'])
			})
	}, [])

	function getVersions() {
		fetch(`http://localhost:5000/statements/${id}/versions`)
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
	}

	const versionRows = versions.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="version_number">
					{ row.version_number }
					</TableCell>
					<TableCell
						id="format">
					{ row.format }
					</TableCell>
					<TableCell
						id="catalog_name">
					{ row.catalog_name }
					</TableCell>
					<TableCell>
						<Button
							color="secondary"
							variant="outlined"
							onClick={handleDelete}
							value={ row.id }
							id={`delete-${row.id}`}
						>
							Delete
						</Button>
					</TableCell>
				</TableRow>
				)
		})

	function handleSubmit(e) {
		e.preventDefault()

		var previousStatement = e.target.previousStatement.value
		console.log(previousStatement)

		fetch(`http://localhost:5000/statements/${id}`, {
				method: 'PUT',
				body: JSON.stringify(
					{
					'previous_balance_id': previousStatement,
				})
			})
		.then(res =>
			fetch(`http://localhost:5000/statements/${id}/generate-summary`, {
					method: 'POST'
				}))
		.catch(error => setMsg('Error uploading'))

		console.log(previousStatement)


	}
	

	function handleDelete(e) {
		const version_id = e.currentTarget.value
		fetch(`http://localhost:5000/statements/${id}/versions/${version_id}`, {
			method: 'DELETE'
		})
		.then(res => fetch(`http://localhost:5000/statements/${id}/versions`))
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
		}

	const previousBalanceChoices = previousBalances.map((previousBalance) =>
		{
			return (
				<option
					value={previousBalance.id}
				>{previousBalance.statement_balance_table}
				</option>
			)
	})

	function handleStatementDelete(e) {
		fetch(`http://localhost:5000/statements/${id}`, {
			method: 'DELETE'
		})
		.catch(error => setMsg('Error deleting'))
		.then(res => res.json())
		.then(json => history.push('/statements/'))
	}

	return (
			<Container>
				<Header name='Edit Statement'/>
				<Grid container spacing={3} style={{marginTop: 8}} alignItems="center">
					<Grid item xs={6}>
					<form
						id="update"
						onSubmit={handleSubmit}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
						>
						Save Changes
						</Button>
					</form>
					</Grid>
					<Grid item xs={12}>
					<Paper style={{padding: 10}}>
					<Typography component="h6" variant="h6" gutterBottom>Previous Statement</Typography>
						<select
							id="previousStatement"
							form="update"
							value={summary['previous_balance_id']}
							>
							<option
								id='None'
								value='0'
								>
							None
							</option>
							{previousBalanceChoices}
						</select>
					</Paper>
					</Grid>
					<Grid item xs={12}>
					<Paper style={{padding: 10}}>
					<Typography component="h6" variant="h6" gutterBottom>Statement Versions</Typography>
					<Table id='edit-statement' size="small">
						<TableRow>
							<TableCell>Version Number</TableCell>
							<TableCell>Format</TableCell>
							<TableCell>Catalog Name</TableCell>
							<TableCell></TableCell>
						</TableRow>
						{versionRows}
					</Table>
					</Paper>
					</Grid>
					<Grid item xs={12}>
					<Paper style={{padding: 10}}>
					<Typography component="p" variant="subtitle" gutterBottom>Delete Statement</Typography>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							id="delete-statement"
							onClick={handleStatementDelete}
						>
						Delete
						</Button>
					</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default StatementEdit
