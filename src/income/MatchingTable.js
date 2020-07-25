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


function MatchingTable() {

	const [ msg, setMsg ] = useState('')
	const [rows, setRows] = useState([])
	const [upcs, setUpcs] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/income/matching-errors')
		.then(res => res.json())
		.then(json => setRows(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	useEffect(() => {
		fetch('http://localhost:5000/version')
		.then(res => res.json())
		.then(json => setUpcs(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.version_number} : {upc.upc}
				</option>
			)
	})

	const history = useHistory()

	function handleUpdate(e) {
		e.preventDefault()
		// select which elements to update on
		console.log(e.target.entry_id.value)
		console.log(e.target.new_upc.value)
		fetch('http://localhost:5000/income/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{'id': e.target.entry_id.value,
				'upc_id': e.target.new_upc.value
		})}
		)
		.then(res => fetch('http://localhost:5000/income/matching-errors'))
		.then(res => res.json())
		.then(json => setRows(json))
		.catch(res => setMsg('Error fetching data'))
	}

	const [columns] = useState([
		{ name: 'distributor', title: 'Distributor'},
		{ name: 'upc_id', title: 'UPC'},
		{ name: 'version_number', title: 'Version'},
		{ name: 'catalog_id', title: 'Catalog'},
		{ name: 'medium', title: 'Medium'},
		{ name: 'type', title: 'Type'},
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
								id="distributor"/>
							{ row.distributor }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="upc_id"/>
						{ row.upc_id }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="version_number"/>
						{ row.version_number }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="catalog_id"/>
						{ row.catalog_id }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="medium"/>
						{ row.medium }
						</TableCell>
						<TableCell>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="type"/>
						{ row.type }
						</TableCell>
						<TableCell>
							<select
								form={`form${row.id}`}
								id="new_upc">
								{upcChoices}
							</select>
						</TableCell>
						<TableCell>
							<form
								id={`form${row.id}`}
								onSubmit={handleUpdate}>
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


export default MatchingTable
