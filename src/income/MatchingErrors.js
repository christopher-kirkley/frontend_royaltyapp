import React from 'react';

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

	// function handleImportCatalog() {
	// 	history.push('/catalog/import')
	// }

	// function handleClick() {
	// 	history.push('/catalog/add')
	// }

		return (
			<Container>
				<Header name='Matching Errors'/>
				<MatchingTable />
			</Container>
		)
	}


export default MatchingErrors
