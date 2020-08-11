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
	const [data, setData] = useState([])

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				setStatement(json[0]['data'])
				setData(json[0]['data'])
			})
		}
	}, [])

	const [columns] = useState([
		{ name: 'Date', title: 'data'},
		{ name: 'Catalog', title: 'catalog'},
		{ name: 'Artist', title: 'artist'},
		{ name: 'Vendor', title: 'vendor'},
		{ name: 'Description', title: 'description'},
		{ name: 'Net', title: 'net'},
		{ name: 'Item Type', title: 'item_type'},
		{ name: 'Transaction Type', title: 'transaction_type'},
	])

	const dataRows = data.map((row) =>
		{
			return (
				<TableRow>
						<input type="hidden"
							id="id"
							value={row.id}
							/>
							<TableCell
							id="date">
							{ row.date }
							</TableCell>
							<TableCell
								id="catalog_number">
							{ row.catalog ? row.catalog.catalog_number : ''}
							</TableCell>
							<TableCell
									id="artist_name"
							>
							{ row.artist ? row.artist.artist_name : ''}
							</TableCell>
							<TableCell
									id="vendor">
							{ row.vendor }
							</TableCell>
							<TableCell
									id="description"
									value={row.description}>
							{ row.description }
							</TableCell>
							<TableCell
									id="net">
							{ row.net }
							</TableCell>
							<TableCell
									id="item_type">
							{ row.item_type }
							</TableCell>
							<TableCell
									id="transaction_type">
							{ row.transaction_type }
							</TableCell>
					</TableRow>
				)
		})

	return (
			<Container>
				<Header name='Statement'/>
				<Table id="imported_expense_table">
					<TableRow>
					{ columns.map((column) => 
							<TableCell>
							{ column.name }
							</TableCell>
					)}
					</TableRow>
					{dataRows}
				</Table>
			</Container>
		)
	}


export default StatementView
