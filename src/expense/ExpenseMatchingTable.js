import React, { useState, useEffect } from 'react';
import { useTable } from "react-table"

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';


function ExpenseMatchingTable() {

	const [ msg, setMsg ] = useState('')
	const [rows, setRows] = useState([])
	const [artists, setArtists] = useState([])

	const history = useHistory()

	useEffect(() => {
		fetch('http://localhost:5000/expense/matching-errors')
		.then(res => res.json())
		.then(json => setRows(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	useEffect(() => {
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	const artistChoices = artists.map((artist) =>
		{
			return (
				<option
					id={artist.artist_name}
					value={artist.artist_id}
				>{artist.artist_name}
				</option>
			)
	})


	function handleUpdate(e) {
		e.preventDefault()
		var artist_name = e.target.artist_name_old.value
		// select which elements to update on
		fetch('http://localhost:5000/expense/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{
					'artist_name': e.target.new_artist.value,
					'data_to_match' : 
						[
							{
							'artist_name': artist_name
							}
						]
		})}
		)
		.then(res => fetch('http://localhost:5000/expense/matching-errors'))
		.then(res => res.json())
		.then(json => setRows(json))
		.catch(res => setMsg('Error fetching data'))
	}


	const [columns] = useState([
		{ name: 'Artist Name', title: 'artist_name'},
		{ name: 'Catalog Number', title: 'catalog_number'},
		{ name: 'Description', title: 'description'},
		{ name: 'Item Type', title: 'item_type'},
		{ name: 'Transaction Type', title: 'transaction_type'},
		{ name: 'Vendor', title: 'vendor'},
		{ name: 'Update Value	', title: 'update_value'},
	])

	return (
		<Container component={Paper}>
			<Table id="matching_error_table">
				<TableRow>
				{ columns.map((column) => 
						<TableCell>
						{ column.name }
						</TableCell>
				)}
				</TableRow>
			{ rows.map((row) => 
				<TableRow>
						<input type="hidden"
							form={`form${row.id}`}
							id="artist_name_old"
							value={row.artist_name}
							/>
						<TableCell
							id="artist_name">
							{ row.artist_name }
						</TableCell>
						<TableCell
							id="catalog_number">
						{ row.catalog_number }
						</TableCell>
						<TableCell
								id="description"
								value={row.description}>
						{ row.description }
						</TableCell>
						<TableCell
								id="item_type">
						{ row.item_type }
						</TableCell>
						<TableCell
								id="expense_type"
								value={row.expense_type}>
						{ row.expense_type }
						</TableCell>
						<TableCell
								id="vendor">
						{ row.vendor }
						</TableCell>
						<TableCell>
							<select
								form={`form${row.id}`}
								id="new_artist">
							{artistChoices}
							</select>
						</TableCell>
						<TableCell>
							<form
								id={`form${row.id}`}
								onSubmit={handleUpdate}
								>
								<Button
									type="submit"
									id="update">
								Update
								</Button>
							</form>
						</TableCell>
				</TableRow>
			)}
			</Table>
		</Container>
		);
}


export default ExpenseMatchingTable
