import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddExpenseStatementForm from './AddExpenseStatementForm'
import DisplayMatchingErrors from '../income/DisplayMatchingErrors'
import UploadedStatements from '../income/UploadedStatements'

function Expense() {

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
			.then(res => res[0]['total_matching_errors'])
			.then(res => setMatchingErrors(1))
			.catch(error => setMatchingErrorsMsg('Error!'))
	}, [])

	function getMatchingErrors() {
		fetch(`http://localhost:5000/expense/matching-errors`)
		.then(res => res.json())
		.then(res => res[0]['total_matching_errors'])
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
				<AddExpenseStatementForm
					getMatchingErrors={getMatchingErrors}
					getPendingStatements={getPendingStatements}/>
		{
				// <AddStatementForm
				// 	getMatchingErrors={getMatchingErrors}
				// 	getPendingStatements={getPendingStatements}/>
			}
				<UploadedStatements
					pendingStatements={pendingStatements}
					processPending={processPending}
				/>
				<DisplayMatchingErrors
					matchingErrors={matchingErrors}
					goToMatchingErrorPage={goToMatchingErrorPage}/>
			</Container>
		)
	}


export default Expense
