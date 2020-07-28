import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import ImportedIncomeTable from './ImportedIncomeTable'

function ImportedIncome() {

	const history = useHistory()

	const [ importedIncome, setImportedIncome ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/income/imported')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}, [])

	function getImportedIncome() {
		fetch('http://localhost:5000/income/imported')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}

	return (
			<Container>
				<Header name='View Imported Income'/>
				<ImportedIncomeTable importedIncome={importedIncome}/>
			</Container>
		)
	}


export default ImportedIncome
