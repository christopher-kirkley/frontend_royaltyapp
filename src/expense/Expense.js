import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddExpenseStatementForm from './AddExpenseStatementForm'
// import DisplayMatchingErrors from './DisplayMatchingErrors'
// import UploadedStatements from './UploadedStatements'

function Expense() {

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

	return (
			<Container>
				<Header name='Expense'/>
				<AddExpenseStatementForm/>
		{
				// <AddStatementForm
				// 	getMatchingErrors={getMatchingErrors}
				// 	getPendingStatements={getPendingStatements}/>
				// <DisplayMatchingErrors matchingErrors={matchingErrors}/>
				// <UploadedStatements pendingStatements={pendingStatements}/>
			}
			</Container>
		)
	}


export default Expense
