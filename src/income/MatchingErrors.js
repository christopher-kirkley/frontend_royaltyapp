import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
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
				<Alert severity="error">You have { rows.length} UPC matching errors</Alert>
				<Divider style={{marginTop: 10}}/>
				<Paper>
				<MatchingTable
					rows={rows}
					setRows={setRows}
				/>
				</Paper>
			</Container>
		)
	}


export default MatchingErrors
