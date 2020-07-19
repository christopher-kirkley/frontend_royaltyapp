import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddStatementForm from './AddStatementForm'
import DisplayMatchingErrors from './DisplayMatchingErrors'
import MatchingTable from './MatchingTable'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function MatchingErrors() {

	const history = useHistory()

	const columns = React.useMemo(
	() => [
			{
			Header: 'Distributor',
			accessor: 'firstName',
			},
			{
			Header: 'UPC',
			accessor: 'lastName',
			},
			{
			Header: 'ISRC',
			accessor: 'age',
			},
			{
			Header: 'Version',
			accessor: 'version',
			},
			{
			Header: 'Catalog',
			accessor: 'catalog',
			},
			{
			Header: 'Album Name',
			accessor: 'albumName',
			},
			{
			Header: 'Track Name',
			accessor: 'trackName',
			},
			{
			Header: 'Type',
			accessor: 'type',
			},
			{
			Header: 'Medium',
			accessor: 'medium',
			},
		]
		)

	const [ matchingErrors, setMatchingErrors ] = useState([])
	const [ msg, setMsg ] = useState('')

	useEffect(() => {
		fetch('http://localhost:5000/income/matching-errors')
		.then(res => res.json())
		.then(json => setMatchingErrors(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])
	
	const data = []

		return (
			<Container>
				<Header name='Matching Errors'/>
				<MatchingTable columns={columns} data={matchingErrors} msg={msg}/>
			</Container>
		)
	}


export default MatchingErrors
