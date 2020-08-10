import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import ImportedStatementTable from './ImportedStatementTable'

function ImportedExpense() {

	const history = useHistory()

	const [ importedExpense, setImportedExpense ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => setImportedExpense(json))
	}, [])

	function getImportedExpense() {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => setImportedExpense(json))
	}

	return (
			<Container>
				<Header name='View Imported Expense'/>
				<ImportedStatementTable importedExpense={importedExpense}
					getImportedExpense={getImportedExpense}/>
			</Container>
		)
	}


export default ImportedExpense
