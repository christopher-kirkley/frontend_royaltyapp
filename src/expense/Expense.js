import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddExpenseStatementForm from './AddExpenseStatementForm'
import PendingImports from '../income/PendingImports'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Expense() {
	
	const classes = useStyles()

	const history = useHistory()

	const [ matchingErrors, setMatchingErrors ] = useState(0)
	const [ matchingErrorsMsg, setMatchingErrorsMsg ] = useState('')
	const [ pendingStatements, setPendingStatements ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/expense/pending-statements')
		.then(res => res.json())
		.then(json => setPendingStatements(json))
	}, [])

	function getPendingStatements() {
		fetch(`http://localhost:5000/expense/pending-statements`)
		.then(res => res.json())
		.then(res => setPendingStatements(res))
	}

	useEffect(() => { 
			fetch(`http://localhost:5000/expense/matching-errors`)
			.then(res => res.json())
			.then(res => res[0]['total_matching_errors'].length)
			.then(res => (
				setMatchingErrors(res)
				))
			.catch(error => setMatchingErrorsMsg('Error!'))
	}, [])

	function getMatchingErrors() {
		fetch(`http://localhost:5000/expense/matching-errors`)
		.then(res => res.json())
		.then(res => res[0]['total_matching_errors'].length)
		.then(res => setMatchingErrors(res))
	}

	function goToMatchingErrorPage() {
		history.push('/expense/matching-errors')
	}

	function processPending() {
		fetch('http://localhost:5000/expense/process-pending', {
				method: 'POST'}
		)
	}

	return (
			<Container>
				<Header name='Expense'/>
				<Grid container spacing={4} direction="column">
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<AddExpenseStatementForm
								getMatchingErrors={getMatchingErrors}
								getPendingStatements={getPendingStatements}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<PendingImports
								pendingStatements={pendingStatements}
								processPending={processPending}
								matchingErrors={matchingErrors}
								goToMatchingErrorPage={goToMatchingErrorPage}/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default Expense
