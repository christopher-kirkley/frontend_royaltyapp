import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

import Header from '../components/Header'
import MatchingTable from './MatchingTable'

function MatchingErrors(props) {
	const history = useHistory()

	const [rows, setRows] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/income/matching-errors')
		.then(res => res.json())
		.then(json => setRows(json))
	}, rows)


	return (
			<Container>
				<Header name='Income Matching Errors'/>
				<Alert severity="error">You have { rows.length} errors</Alert>
				<Divider style={{marginTop: 10}}/>
				<Alert severity="info">Match by column, select the column which you want to match.</Alert>
				<Divider style={{marginTop: 10}}/>
				<MatchingTable
					rows={rows}
					setRows={setRows}
				/>
			</Container>
		)
	}


export default MatchingErrors
