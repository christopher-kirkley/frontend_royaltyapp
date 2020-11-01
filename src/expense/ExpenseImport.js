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
import PendingImports from '../components/PendingImports'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function ExpenseImport() {
	
	const classes = useStyles()

	const history = useHistory()

	const [ matchingErrors, setMatchingErrors ] = useState(0)
	const [ matchingErrorsMsg, setMatchingErrorsMsg ] = useState('')
	const [ pendingStatements, setPendingStatements ] = useState([])
	const [ artistMatchingErrors, setArtistMatchingErrors ] = useState(0)
	const [ catalogMatchingErrors, setCatalogMatchingErrors ] = useState(0)
	const [ typeMatchingErrors, setTypeMatchingErrors ] = useState(0)

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

	function getMatchingErrors() {
		fetch('http://localhost:5000/expense/artist-matching-errors')
			.then(res => res.json())
			.then(json => setArtistMatchingErrors(json.length))

		fetch('http://localhost:5000/expense/catalog-matching-errors')
			.then(res => res.json())
			.then(json => setCatalogMatchingErrors(json.length))

		fetch('http://localhost:5000/expense/type-matching-errors')
			.then(res => res.json())
			.then(json => setTypeMatchingErrors(json.length))
	}

	useEffect(() => { 
		getMatchingErrors()
	}, [])

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
				<Header name='Expense Import'/>
				<Grid container spacing={4} direction="column">
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<AddExpenseStatementForm
								getMatchingErrors={getMatchingErrors}
								getPendingStatements={getPendingStatements}
							/>
						</Paper>
					</Grid>
					{ pendingStatements.length > 0
						?
						<Grid item xs={12}>
							<Paper elevation={3} className={classes.paper}>
								<PendingImports
									pendingStatements={pendingStatements}
									processPending={processPending}
									matchingErrors={matchingErrors}
									goToMatchingErrorPage={goToMatchingErrorPage}
									artistMatchingErrors={artistMatchingErrors}
									typeMatchingErrors={typeMatchingErrors}
									catalogMatchingErrors={catalogMatchingErrors}
							/>
							</Paper>
						</Grid>
						:
						null
					}
				</Grid>
			</Container>
		)
	}


export default ExpenseImport
