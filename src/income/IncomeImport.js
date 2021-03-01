import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'

import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddStatementForm from './AddStatementForm'
import PendingImports from '../components/PendingImports'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function IncomeImport() {

	const classes = useStyles()

	const history = useHistory()

	const [ matchingErrorsMsg, setMatchingErrorsMsg ] = useState('')
	const [ pendingStatements, setPendingStatements ] = useState([])
	const [ matchingErrors, setMatchingErrors ] = useState(0)
	const [ trackMatchingErrors, setTrackMatchingErrors ] = useState(0)
	const [ refundMatchingErrors, setRefundMatchingErrors ] = useState(0)

	const [ loading, setLoading ] = useState(false)

	useEffect(() => {
		fetch('http://localhost:5000/income/pending-statements')
		.then(res => res.json())
		.then(json => setPendingStatements(json))
	}, [])

	function getPendingStatements() {
		fetch(`http://localhost:5000/income/pending-statements`)
		.then(res => res.json())
		.then(res => setPendingStatements(res))
	}

	useEffect(() => { 
			fetch(`http://localhost:5000/income/matching-errors`)
			.then(res => res.json())
			.then(res => res.length)
			.then(res => setMatchingErrors(res))
			.catch(error => setMatchingErrorsMsg('Error!'))
			.then(res => fetch(`http://localhost:5000/income/track-matching-errors`))
			.then(res => res.json())
			.then(res => res.length)
			.then(res => setTrackMatchingErrors(res))
			.then(res => getRefundMatchingErrors())

	}, [])

	function getMatchingErrors() {
		fetch(`http://localhost:5000/income/matching-errors`)
		.then(res => res.json())
		.then(res => res.length)
		.then(res => setMatchingErrors(res))
	}

	function getTrackMatchingErrors() {
		fetch(`http://localhost:5000/income/track-matching-errors`)
		.then(res => res.json())
		.then(res => res.length)
		.then(res => setTrackMatchingErrors(res))
	}

	function getRefundMatchingErrors() {
		fetch(`http://localhost:5000/income/refund-matching-errors`)
		.then(res => res.json())
		.then(res => res.length)
		.then(res => setRefundMatchingErrors(res))
	}

	function goToMatchingErrorPage() {
		history.push('/income/matching-errors')
	}

	function processPending() {
		fetch('http://localhost:5000/income/process-pending', {
				method: 'POST'}
		)
		.then(res => res.json())
		.then(res => history.push('/income'))
	}
	
	function handleDelete(id) {
		fetch(`http://localhost:5000/income/pending-statements/${id}`, {
			  method: 'DELETE'
		})
		.then(res => getPendingStatements())
		.then(res => getMatchingErrors())
		.then(res => getTrackMatchingErrors())
	}


	return (
			<Container>
				<Header name='Import Income' />
				<Grid container spacing={4} direction="column">
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
						<AddStatementForm
							getMatchingErrors={getMatchingErrors}
							getRefundMatchingErrors={getRefundMatchingErrors}
							getTrackMatchingErrors={getTrackMatchingErrors}
							getPendingStatements={getPendingStatements}
							loading={loading}
							setLoading={setLoading}
						/>
						</Paper>
					</Grid>
					{ 
					 pendingStatements.length > 0
						?
						<Grid item xs={12}>
							<Paper elevation={3} className={classes.paper}>
									<PendingImports
										loading={loading}
										pendingStatements={pendingStatements}
										processPending={processPending}
										goToMatchingErrorPage={goToMatchingErrorPage}
										handleDelete={handleDelete}
										trackMatchingErrors={trackMatchingErrors}
										matchingErrors={matchingErrors}
										refundMatchingErrors={refundMatchingErrors}
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


export default IncomeImport
