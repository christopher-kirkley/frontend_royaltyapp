import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import IncomeTable from './IncomeTable'

import { service } from '../_services/services.js'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function ImportedIncome() {

	const classes = useStyles()

	const history = useHistory()

	const [ importedIncome, setImportedIncome ] = useState([])

	useEffect(() => {
		getImportedIncome()
	}, [])


	function getImportedIncome() {
		service.getAll('income/imported-statements')
		.then(json => setImportedIncome(json))
	}


	return (
			<Container>
				<Header name='View Imported Income'/>
				<Paper elevation={4} className={classes.paper}>
				<IncomeTable importedIncome={importedIncome}
					getImportedIncome={getImportedIncome}/>
				</Paper>
			</Container>
		)
	}


export default ImportedIncome
