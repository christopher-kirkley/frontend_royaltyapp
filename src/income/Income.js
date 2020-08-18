import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddStatementForm from './AddStatementForm'
import DisplayMatchingErrors from './DisplayMatchingErrors'
import UploadedStatements from './UploadedStatements'

function Income() {

	const history = useHistory()

	const [ matchingErrors, setMatchingErrors ] = useState(0)
	const [ matchingErrorsMsg, setMatchingErrorsMsg ] = useState('')
	const [ pendingStatements, setPendingStatements ] = useState([])

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
	}, [])

	function getMatchingErrors() {
		fetch(`http://localhost:5000/income/matching-errors`)
		.then(res => res.json())
		.then(res => res.length)
		.then(res => setMatchingErrors(res))
	}

	function goToMatchingErrorPage() {
		history.push('/expense/matching-errors')
	}

	function processPending() {
		fetch('http://localhost:5000/income/process-pending', {
				method: 'POST'}
		)
	}
	
	return (
			<Container>
				<Header name='Income' />
				<Grid container 
					style={{marginTop: 10}}
					spacing={4} direction="column"
					justify="space-evenly"
					alignItems="center">
					<Grid item>
						<Paper elevation={3}>
						<AddStatementForm
							getMatchingErrors={getMatchingErrors}
							getPendingStatements={getPendingStatements}/>
						</Paper>
					</Grid>
					<Grid item>
						<Paper elevation={3}
						style={{padding: 10}}>
						<DisplayMatchingErrors
							matchingErrors={matchingErrors}
							goToMatchingErrorPage={goToMatchingErrorPage}/>
						</Paper>
					</Grid>
					<Grid item>
						<Paper elevation={3}>
						<UploadedStatements
							pendingStatements={pendingStatements}
							processPending={processPending}
						/>
						</Paper>
					</Grid>
			</Grid>
			</Container>
		)
	}


export default Income
