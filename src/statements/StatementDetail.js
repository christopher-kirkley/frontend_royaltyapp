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

function StatementView() {

	const { id } = useParams()

	const [statement, setStatement] = useState([])
	const [detail, setDetail] = useState([])
	const [summary, setSummary] = useState({})

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				console.log(json)
				setDetail(json['detail'])
				setSummary(json['summary'])
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
							id="view">
							View
						</Button>
					</TableCell>
				</TableRow>
				)
		})

	return (
			<Container>
				<Header name='Statement Summary'/>
				<Grid>
					<Grid item>
						<Typography>Current Owed:
						{summary['statement_total']}
						</Typography>
						<Typography>Previous Balance Statement: </Typography>
					</Grid>
				</Grid>
				<Table id="statement_summary_table">
					<TableRow>
						<TableCell>Artist</TableCell>
						<TableCell>Open Balance</TableCell>
						<TableCell></TableCell>
						<TableCell></TableCell>
					</TableRow>
					{detailRows}
				</Table>
			</Container>
		)
	}


export default StatementView
