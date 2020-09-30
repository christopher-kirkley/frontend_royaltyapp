import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	active: {
		backgroundColor: "green"
	}
}))

function MatchingTable() {

	const classes = useStyles()

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


	function handleUpdate(e) {
		e.preventDefault()
		if (e.target.version_number.checked)
			{var version_number = e.target.version_number.value}
		if (e.target.medium.checked)
			{var medium = e.target.medium.value}
		if (e.target.description.checked)
			{var description = e.target.description.value}
		// select which elements to update on
		fetch('http://localhost:5000/income/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{
					'upc_id': e.target.new_upc.value,
					'data_to_match' : 
						[
							{
							'version_number': version_number,
							'medium': medium,
							'description': description,
							}
						]
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
		{ name: 'description	', title: 'Description'},
	])

	const [distributor, setDistributor] = useState(false)
	const [upc, setUpc] = useState(false)
	const [versionNumber, setVersionNumber] = useState(false)

	function changeColor(item) {
		if (item == 'distributor') {
			setDistributor(!distributor)
		}
		if (item == 'upc') {
			setUpc(!upc)
		}
		if (item == 'version_number') {
			setVersionNumber(!versionNumber)
		}
	}

	return (
		<Container component={Paper}>
			<Typography variant="caption">Select which column to update.</Typography>
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
						<TableCell className={ distributor ? classes.active : null }>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="distributor"
								onClick={()=>changeColor('distributor')}
							/>
							{ row.distributor }
						</TableCell>
						<TableCell className={ upc ? classes.active : null }>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="upc_id"
								onClick={()=>changeColor('upc')}
							/>
						{ row.upc_id }
						</TableCell>
						<TableCell className={ versionNumber ? classes.active : null }>
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="version_number"
								value={row.version_number}
								onClick={()=>changeColor('version_number')}
							/>
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
								id="medium"
								value={row.medium}/>
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
							<input
								type="checkbox"
								form={`form${row.id}`}
								id="description"
								value={row.description}/>
						{ row.description }
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
