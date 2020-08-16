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

function StatementDetail() {

	const history = useHistory()

	const { id, artistId } = useParams()

	const [income, setIncome] = useState([])
	const [msg, setMsg] = useState('')

	useEffect(() => {
		fetch(`http://localhost:5000/statements/${id}/artist/${artistId}`)
		.then(res => res.json())
		.then(json => setIncome(json['income']))
		.catch(res => setMsg('Error fetching data'))
	}, [])



	const incomeRows = income.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="catalog_name">
					{ row.catalog_name }
					</TableCell>
					<TableCell
						id="digital_net">
					{ row.digital_net }
					</TableCell>
					<TableCell
						id="physical_net">
					{ row.physical_net }
					</TableCell>
					<TableCell
						id="combined_net">
					{ row.combined_net }
					</TableCell>
				</TableRow>
				)
		})

	return (
			<Container>
				<Header name='Statement Detail'/>
				<Grid>
					<Grid item>
						<Typography>Detail for ___</Typography>
					</Grid>
				</Grid>

				<Table id="artist-statement-summary">
					<TableRow>
					</TableRow>
				</Table>

				<Typography>Income</Typography>
				<Table id="artist-statement-income">
					<TableRow>
						<TableCell>Release</TableCell>
						<TableCell>Digital</TableCell>
						<TableCell>Physical</TableCell>
						<TableCell>Total</TableCell>
					</TableRow>
					{incomeRows}
				</Table>

				<Typography>Expenses</Typography>
				<Table id="artist-statement-expense">
					<TableRow>
					</TableRow>
				</Table>
		
				<Table id="artist-statement-advance">
					<TableRow>
					</TableRow>
				</Table>
				
				<Typography>Sales Details</Typography>

				<Table id="albums">
					<TableRow>
					</TableRow>
				</Table>

				<Table id="tracks">
					<TableRow>
					</TableRow>
				</Table>
			

			</Container>
		)
	}


export default StatementDetail
