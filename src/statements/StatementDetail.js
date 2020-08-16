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
	const [expense, setExpense] = useState([])
	const [advance, setAdvance] = useState([])
	const [albumSales, setAlbumSales] = useState([])
	const [msg, setMsg] = useState('')

	useEffect(() => {
		fetch(`http://localhost:5000/statements/${id}/artist/${artistId}`)
		.then(res => res.json())
		.then(json => {
			console.log(json)
			setIncome(json['income'])
			setExpense(json['expense'])
			setAdvance(json['advance'])
			setAlbumSales(json['album_sales'])
		}
		)
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

	const expenseRows = expense.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="date">
					{ row.date }
					</TableCell>
					<TableCell
						id="detail">
					{ row.detail }
					</TableCell>
					<TableCell
						id="expense">
					{ row.expense }
					</TableCell>
					<TableCell
						id="item">
					{ row.item }
					</TableCell>
					<TableCell
						id="vendor">
					{ row.vendor }
					</TableCell>
				</TableRow>
				)
		})
	
	const advanceRows = advance.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="date">
					{ row.date }
					</TableCell>
					<TableCell
						id="detail">
					{ row.detail }
					</TableCell>
					<TableCell
						id="expense">
					{ row.expense }
					</TableCell>
					<TableCell
						id="item">
					{ row.item }
					</TableCell>
					<TableCell
						id="vendor">
					{ row.vendor }
					</TableCell>
				</TableRow>
				)
		})

	const albumSalesRows = albumSales.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="catalog_name">
					{ row.catalog_name }
					</TableCell>
					<TableCell
						id="version_number">
					{ row.version_number }
					</TableCell>
					<TableCell
						id="format">
					{ row.format }
					</TableCell>
					<TableCell
						id="quantity">
					{ row.quantity }
					</TableCell>
					<TableCell
						id="net">
					{ row.net }
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

				<Typography>Expenses (50% Recoupable)</Typography>
				<Table id="artist-statement-expense">
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Item</TableCell>
						<TableCell>Vendor</TableCell>
						<TableCell>Detail</TableCell>
						<TableCell>Expense</TableCell>
					</TableRow>
					{expenseRows}
				</Table>
		
				<Typography>Advance (100% Recoupable)</Typography>
				<Table id="artist-statement-advance">
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Item</TableCell>
						<TableCell>Vendor</TableCell>
						<TableCell>Detail</TableCell>
						<TableCell>Expense</TableCell>
					</TableRow>
					{advanceRows}
				</Table>
				
				<Typography>Sales Details</Typography>

				<Table id="album-sales">
					<TableRow>
						<TableCell>Release</TableCell>
						<TableCell>Version</TableCell>
						<TableCell>Format</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Sum</TableCell>
					</TableRow>
					{albumSalesRows}
				</Table>

				<Table id="track-sales">
					<TableRow>
					</TableRow>
				</Table>
			

			</Container>
		)
	}


export default StatementDetail
