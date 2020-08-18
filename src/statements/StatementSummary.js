import React, { useState, useEffect } from 'react'

import { Redirect, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

function StatementSummary() {

	const history = useHistory()

	const { id } = useParams()

	const [statementName, setStatementName] = useState([])
	const [detail, setDetail] = useState([])
	const [summary, setSummary] = useState({})

	function handleClick(e) {
		const artistId = e.currentTarget.value
		history.push(`/statements/${id}/artist/${artistId}`)
	}

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				setDetail(json['detail'])
				setSummary(json['summary'])
				setStatementName(json['summary']['statement'])
			})
		}
	}, [])


	const detailRows = detail.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="artist_name">
					{ row.artist_name }
					</TableCell>
					<TableCell
						id="balance_forward">
					{ row.balance_forward }
					</TableCell>
					<TableCell>
						<Button
							color="primary"
							variant="contained"
							onClick={handleClick}
							value={ row.id }
							id={ row.id }
						>
							View
						</Button>
					</TableCell>
				</TableRow>
				)
		})

	return (
			<Container>
				<Header name='Statement Summary'/>
				<Grid container
					style={{marginTop: 10}}
					spacing={3}>
						<Grid item xs={12}>
						<Paper style={{padding: 15}}>
							<Typography id="statement-name" component="h5" variant="h5">{statementName}</Typography>
							<Typography id="current-owed" component="h6" variant="h6">Current Owed: {summary['statement_total']}</Typography>
							<Typography id="current-owed" component="h6" variant="h6">Previous Balance: {summary['previous_balance']}</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper style={{padding: 15}}>
						<Table id="statement_summary_table">
							<TableRow>
								<TableCell>Artist</TableCell>
								<TableCell>Open Balance</TableCell>
								<TableCell></TableCell>
							</TableRow>
							{detailRows}
						</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default StatementSummary
