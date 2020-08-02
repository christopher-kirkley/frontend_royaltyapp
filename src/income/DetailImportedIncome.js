import React, { useState, useEffect } from 'react'

import { Redirect, useParams, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import ImportedIncomeTable from './ImportedIncomeTable'
import DetailImportedIncomeTable from './DetailImportedIncomeTable'
import DetailImportedIncomeSummary from './DetailImportedIncomeSummary'
import DetailImportedIncomeVersions from './DetailImportedIncomeVersions'

function DetailImportedIncome() {

	const { id } = useParams()

	const [statement, setStatement] = useState([])
	const [summary, setSummary] = useState([])
	const [digitalVersions, setDigitalVersions] = useState([])
	const [physicalVersions, setPhysicalVersions] = useState([])

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/income/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				setStatement(json[0]['data'])
				setSummary(json[0])
				setPhysicalVersions(json[0]['physical'])
				setDigitalVersions(json[0]['digital'])
			})
		}
	}, [])

	return (
			<Container>
				<Header name='Detail Imported Income'/>
				<DetailImportedIncomeSummary summary={summary}/>
			</Container>
		)
	}


export default DetailImportedIncome
