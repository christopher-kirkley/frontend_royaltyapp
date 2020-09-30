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

	const [distributorChecked, setDistributorChecked] = useState(false)
	const [upcChecked, setUpcChecked] = useState(false)
	const [versionNumberChecked, setVersionNumberChecked] = useState(false)
	const [descriptionChecked, setDescriptionChecked] = useState(false)
	const [catalogChecked, setCatalogChecked] = useState(false)
	const [mediumChecked, setMediumChecked] = useState(false)
	const [typeChecked, setTypeChecked] = useState(false)

	function handleUpdate(e) {
		e.preventDefault()
		if (versionNumberChecked)
			{var version_number = e.target.version_number.value}
		if (catalogChecked)
			{var catalog = e.target.catalog.value}
		if (mediumChecked)
			{var medium = e.target.medium.value}
		if (typeChecked)
			{var type = e.target.type.value}
		if (distributorChecked)
			{var distributor = e.target.distributor.value}
		if (upcChecked)
			{var upc = e.target.upc.value}
		if (descriptionChecked)
			{var description = e.target.description.value}
		
		console.log(
			JSON.stringify(
				{
					'upc_id': e.target.new_upc.value,
					'data_to_match' : 
						[
							{
							'distributor': distributor,
							'upc': upc,
							'catalog': catalog,
							'type': type,
							'version_number': version_number,
							'medium': medium,
							'description': description,
							}
						]
		}))
		// select which elements to update on
		fetch('http://localhost:5000/income/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{
					'upc_id': e.target.new_upc.value,
					'data_to_match' : 
						[
							{
							'distributor': distributor,
							'upc': upc,
							'catalog': catalog,
							'type': type,
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


	function changeColor(item) {
		if (item == 'distributor') {
			setDistributorChecked(!distributorChecked)
		}
		if (item == 'upc') {
			setUpcChecked(!upcChecked)
		}
		if (item == 'version_number') {
			setVersionNumberChecked(!versionNumberChecked)
		}
		if (item == 'medium') {
			setMediumChecked(!mediumChecked)
		}
		if (item == 'catalog') {
			setCatalogChecked(!catalogChecked)
		}
		if (item == 'description') {
			setDescriptionChecked(!descriptionChecked)
		}
		if (item == 'type') {
			setTypeChecked(!typeChecked)
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
						<input type="hidden"
							form={`form${row.id}`}
							value={row.distributor}
							id="distributor"
							/>
						<TableCell
							className={ distributorChecked ? classes.active : null }
							onClick={()=>changeColor('distributor')}
						>
							{ row.distributor }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.upc_id}
							id="upc"
							/>
						<TableCell
							className={ upcChecked ? classes.active : null }
							onClick={()=>changeColor('upc')}
						>
						{ row.upc_id }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.version_number}
							id="version_number"
							/>
						<TableCell
							className={ versionNumberChecked ? classes.active : null }
							onClick={()=>changeColor('version_number')}
						>
						{ row.version_number }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.catalog}
							id="catalog"
							/>
						<TableCell
							className={ catalogChecked ? classes.active : null }
							onClick={()=>changeColor('catalog')}
						>
						{ row.catalog_id }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.medium}
							id="medium"
							/>
						<TableCell
							className={ mediumChecked ? classes.active : null }
							onClick={()=>changeColor('medium')}
						>
						{ row.medium }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.type}
							id="type"
							/>
						<TableCell
							className={ typeChecked ? classes.active : null }
							onClick={()=>changeColor('type')}
						>
						{ row.type }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.description}
							id="description"
							/>
						<TableCell
							className={ descriptionChecked ? classes.active : null }
							onClick={()=>changeColor('description')}
						>
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
