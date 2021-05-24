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

import { service } from '../_services/services.js'

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
		service.getAll('income/pending-statements')
		.then(json => setPendingStatements(json))
	}, [])

	function getPendingStatements() {
		service.getAll('income/pending-statements')
		.then(res => setPendingStatements(res))
	}

	useEffect(() => { 
		service.getAll('income/matching-errors')
			.then(res => res.length)
			.then(res => setMatchingErrors(res))
			.catch(error => setMatchingErrorsMsg('Error!'))
			.then(res => getTrackMatchingErrors())
			.then(res => getRefundMatchingErrors())

	}, [])

	function getMatchingErrors() {
		service.getAll('income/matching-errors')
		.then(res => res.length)
		.then(res => setMatchingErrors(res))
	}

	function getTrackMatchingErrors() {
		service.getAll('income/track-matching-errors')
		.then(res => res.length)
		.then(res => setTrackMatchingErrors(res))
	}

	function getRefundMatchingErrors() {
		service.getAll('income/refund-matching-errors')
		.then(res => res.length)
		.then(res => setRefundMatchingErrors(res))
	}

	function goToMatchingErrorPage() {
		history.push('/income/matching-errors')
	}

	function processPending() {
		service.post('income/process-pending')
		.then(res => history.push('/income'))
	}
	
	function handleDelete(id) {
		service._deleteItem(`income/pending-statements/${id}`)
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
