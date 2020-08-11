import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
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
				<Header name='Income'/>
				<AddStatementForm
					getMatchingErrors={getMatchingErrors}
					getPendingStatements={getPendingStatements}/>
				<DisplayMatchingErrors
					matchingErrors={matchingErrors}
					goToMatchingErrorPage={goToMatchingErrorPage}/>
				<UploadedStatements
					pendingStatements={pendingStatements}
					processPending={processPending}
				/>
			</Container>
		)
	}


export default Income
