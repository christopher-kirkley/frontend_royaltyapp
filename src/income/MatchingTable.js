import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function MatchingTable() {

	const history = useHistory()

	const useStyles = makeStyles({
		  table: {
				    minWidth: 650,
				  },
	});

	const classes = useStyles();

	const [ matchingErrors, setMatchingErrors ] = useState([])
	const [ msg, setMsg ] = useState('')

	useEffect(() => {
		fetch('http://localhost:5000/income/matching-errors')
		.then(res => res.json())
		.then(json => setMatchingErrors(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	return (
		<TableContainer component={Paper}>
		<Table className={classes.table} size="small" id="matching_error_table">
		<TableHead>
			<TableRow>
				<TableCell>Distributor</TableCell>
				<TableCell align="right">UPC</TableCell>
				<TableCell align="right">ISRC</TableCell>
				<TableCell align="right">Version ID</TableCell>
				<TableCell align="right">Catalog ID</TableCell>
				<TableCell align="right">Album Name</TableCell>
				<TableCell align="right">Track Name</TableCell>
				<TableCell align="right">Type</TableCell>
				<TableCell align="right">Medium</TableCell>
				<TableCell align="right">Description</TableCell>
				<TableCell align="right">Amount</TableCell>
				<TableCell align="right">Updated Value</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{
				matchingErrors.map((row) => (
										<TableRow key={row.id}>
											<TableCell align="right">{row.distributor}</TableCell>
											<TableCell align="right">{row.upc_id}</TableCell>
											<TableCell align="right">{row.isrc_id}</TableCell>
											<TableCell align="right">{row.version_id}</TableCell>
											<TableCell align="right">{row.catalog_id}</TableCell>
											<TableCell align="right">{row.album_name}</TableCell>
											<TableCell align="right">{row.track_name}</TableCell>
											<TableCell align="right">{row.type}</TableCell>
											<TableCell align="right">{row.medium}</TableCell>
											<TableCell align="right">{row.description}</TableCell>
											<TableCell align="right">{row.amount}</TableCell>
											<TableCell align="right">
												<select>
													<option>Version1</option>
													<option>Version2</option>
												</select>
											</TableCell>
											<TableCell align="right">
												<Button
													variant="contained"
													color="primary"
													id={row.id}
													name="update"
													>
													Update
												</Button>
											</TableCell>
										</TableRow>
				))
			}
		</TableBody>
		{ msg }
		</Table>
		</TableContainer>
		);
}


export default MatchingTable
