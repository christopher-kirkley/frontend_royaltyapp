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

import { service } from '../_services/services.js'

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
		service.getAll('expense/pending-statements')
		.then(json => setPendingStatements(json))
	}, [])

	function getPendingStatements() {
		service.getAll(`expense/pending-statements`)
		.then(res => setPendingStatements(res))
	}

	function getMatchingErrors() {
		service.getAll('expense/artist-matching-errors')
			.then(json => setArtistMatchingErrors(json.length))

		service.getAll('expense/catalog-matching-errors')
			.then(json => setCatalogMatchingErrors(json.length))

		service.getAll('expense/type-matching-errors')
			.then(json => setTypeMatchingErrors(json.length))
	}

	useEffect(() => { 
		getMatchingErrors()
	}, [])

	function goToMatchingErrorPage() {
		history.push('/expense/matching-errors')
	}

	function processPending() {
		service.post('expense/process-pending')
		.then(res => history.push('/expense'))
	}

	function handleDelete(id) {
		service._delete(`expense/pending-statements/${id}`)
		.then(res => getPendingStatements())
		.then(res => getMatchingErrors())
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
									handleDelete={handleDelete}
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
