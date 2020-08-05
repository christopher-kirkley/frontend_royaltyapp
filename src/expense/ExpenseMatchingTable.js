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
	const [upcs, setUpcs] = useState([])

	const history = useHistory()

	useEffect(() => {
		fetch('http://localhost:5000/expense/matching-errors')
		.then(res => res.json())
		.then(json => setRows(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	// useEffect(() => {
	// 	fetch('http://localhost:5000/version')
	// 	.then(res => res.json())
	// 	.then(json => setUpcs(json))
	// 	.catch(res => setMsg('Error fetching data'))
	// }, [])

	// const upcChoices = upcs.map((upc) =>
	// 	{
	// 		return (
	// 			<option
	// 				id={upc.version_number}
	// 				value={upc.upc}
	// 			>{upc.version_number} : {upc.upc}
	// 			</option>
	// 		)
	// })


	// function handleUpdate(e) {
	// 	e.preventDefault()
	// 	if (e.target.version_number.checked)
	// 		{var version_number = e.target.version_number.value}
	// 	if (e.target.medium.checked)
	// 		{var medium = e.target.medium.value}
	// 	if (e.target.description.checked)
	// 		{var description = e.target.description.value}
	// 	// select which elements to update on
	// 	fetch('http://localhost:5000/income/update-errors', {
	// 		method: 'PUT',
	// 		body: JSON.stringify(
	// 			{
	// 				'upc_id': e.target.new_upc.value,
	// 				'data_to_match' : 
	// 					[
	// 						{
	// 						'version_number': version_number,
	// 						'medium': medium,
	// 						'description': description,
	// 						}
	// 					]
	// 	})}
	// 	)
	// 	.then(res => fetch('http://localhost:5000/income/matching-errors'))
	// 	.then(res => res.json())
	// 	.then(json => setRows(json))
	// 	.catch(res => setMsg('Error fetching data'))
	// }


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
							id="entry_id"
							value={row.id}
							/>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="artist_name"/>
							{ row.artist_name }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="catalog_number"/>
						{ row.catalog_number }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="description"
								value={row.description}/>
						{ row.description }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="item_type"/>
						{ row.item_type }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="expense_type"
								value={row.expense_type}/>
						{ row.expense_type }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="vendor"/>
						{ row.vendor }
						</TableCell>
						<TableCell>
							<select
								form={`form${row.id}`}
								id="new_upc">
							</select>
						</TableCell>
						<TableCell>
							<form
								id={`form${row.id}`}
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
