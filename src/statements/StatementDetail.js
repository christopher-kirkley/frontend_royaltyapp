import React, { useState, useEffect } from 'react'

import { Redirect, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

function StatementDetail() {

	const history = useHistory()

	const { id, artistId } = useParams()

	const [artistName, setArtistName] = useState('')
	const [statementName, setStatementName] = useState('')
	const [summary, setSummary] = useState([])
	const [income, setIncome] = useState([])
	const [expense, setExpense] = useState([])
	const [advance, setAdvance] = useState([])
	const [albumSales, setAlbumSales] = useState([])
	const [trackSales, setTrackSales] = useState([])
	const [msg, setMsg] = useState('')

	useEffect(() => {
		fetch(`http://localhost:5000/statements/${id}/artist/${artistId}`)
		.then(res => res.json())
		.then(json => {
			setArtistName(json['artist'])
			setStatementName(json['statement'])
			setSummary(json['summary'][0])
			setIncome(json['income'])
			setExpense(json['expense'])
			setAdvance(json['advance'])
			setAlbumSales(json['album_sales'])
			setTrackSales(json['track_sales'])
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

	const trackSalesRows = trackSales.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="track_name">
					{ row.track_name }
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
				<Grid container spacing={3} style={{padding: 12}}>
					<Grid item xs={12} align="center">
						<Typography component="h5" variant="h5" color="primary">{ artistName }</Typography>
						<Typography component="h5" variant="h5" color="primary">{ statementName }</Typography>
					</Grid>
					<Grid item xs={12} align="left">
					<Paper style={{padding: 15}} elevation={3}>
						<Typography component="h6" variant="h6" color="primary" align="center" gutterBottom>Summary</Typography>
						<Table size="small" id="artist-statement-summary">
							<TableRow>
								<TableCell>Income</TableCell>
								<TableCell id="summary-sales">{summary['sales']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Expenses</TableCell>
								<TableCell id="summary-recoupables">{summary['recoupables']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total to be Split</TableCell>
								<TableCell id="summary-total_to_split">{summary['total_to_split']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>50% of Total</TableCell>
								<TableCell id="summary-split">{summary['split']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Less Advances</TableCell>
								<TableCell id="summary-advances">{summary['advances']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Balance from Previous Statement</TableCell>
								<TableCell id="sales">{summary['previous_balance']}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Artist Balance Forward</TableCell>
								<TableCell id="sales">{summary['balance_forward']}</TableCell>
							</TableRow>
						</Table>
					</Paper>
					</Grid>
					<Grid item xs={12} align="left">
					<Paper style={{padding: 15}} elevation={3}>
						<Typography component="h6" variant="h6" color="primary" align="center" gutterBottom>Income</Typography>
						<Table size="small" id="artist-statement-income">
							<TableHead> 
							<TableRow>
								<TableCell>Release</TableCell>
								<TableCell>Digital</TableCell>
								<TableCell>Physical</TableCell>
								<TableCell>Total</TableCell>
							</TableRow>
							</TableHead>
							{incomeRows}
						</Table>
					</Paper>
					</Grid>
					<Grid item xs={12} align="center">
					<Paper style={{padding: 15}} elevation={3}>
					<Typography component="h6" variant="h6" color="primary" gutterBottom>Expenses (50% Recoupable)</Typography>
					<Table size="small" id="artist-statement-expense">
						<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Item</TableCell>
							<TableCell>Vendor</TableCell>
							<TableCell>Detail</TableCell>
							<TableCell>Expense</TableCell>
						</TableRow>
						</TableHead>
						{expenseRows}
					</Table>
					</Paper>
					</Grid>
					<Grid item xs={12} align="center">
					<Paper style={{padding: 15}} elevation={3}>
					<Typography component="h6" variant="h6" color="primary" gutterBottom>Advance (100% Recoupable)</Typography>
					<Table size="small" id="artist-statement-advance">
						<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Item</TableCell>
							<TableCell>Vendor</TableCell>
							<TableCell>Detail</TableCell>
							<TableCell>Expense</TableCell>
						</TableRow>
						</TableHead>
						{advanceRows}
					</Table>
					</Paper>
					</Grid>
					<Grid item xs={12} align="center">
					<Typography variant="h5" component="h5">Sales Details</Typography>
					</Grid>
					<Grid item xs={12} align="center">
						<Paper style={{padding: 15}} elevation={3}>
						<Typography variant="h6" component="h6" color="primary">Album Sales</Typography>
						<Table size="small" id="album-sales">
							<TableHead> 
							<TableRow>
								<TableCell>Release</TableCell>
								<TableCell>Version</TableCell>
								<TableCell>Format</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Sum</TableCell>
							</TableRow>
							</TableHead>
							{albumSalesRows}
						</Table>
						</Paper>
					</Grid>
					<Grid item xs={12} align="center">
						<Paper style={{padding: 15}} elevation={3}>
						<Typography variant="h6" component="h6" color="primary">Track Sales</Typography>
						<Table size="small" id="track-sales">
							<TableHead>
							<TableRow>
								<TableCell>Track</TableCell>
								<TableCell>Streams/Download</TableCell>
								<TableCell>Sum</TableCell>
							</TableRow>
							</TableHead>
							{trackSalesRows}
						</Table>
						</Paper>
					</Grid>
					</Grid>

			</Container>
		)
	}


export default StatementDetail
