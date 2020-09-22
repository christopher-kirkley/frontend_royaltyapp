import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import ImportedStatementTable from './ImportedStatementTable'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function ImportedExpense() {

	const classes = useStyles()

	const history = useHistory()

	const [ importedExpense, setImportedExpense ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => (setImportedExpense(json), console.log(json)))
	}, [])

	function getImportedExpense() {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => setImportedExpense(json))
	}

	return (
			<Container>
				<Header name='View Imported Expense'/>
				<Paper elevation={4} className={classes.paper}>
					<ImportedStatementTable
						importedExpense={importedExpense}
						getImportedExpense={getImportedExpense}/>
				</Paper>
			</Container>
		)
	}


export default ImportedExpense
