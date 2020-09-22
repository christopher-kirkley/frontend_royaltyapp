import React, { useState, useEffect } from 'react';


import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';

function ExpenseTable() {

	const [ msg, setMsg ] = useState('')
	const [artistMatchingErrors, setArtistMatchingErrors] = useState([])
	const [catalogMatchingErrors, setCatalogMatchingErrors] = useState([])
	const [typeMatchingErrors, setTypeMatchingErrors] = useState([])
	const [artists, setArtists] = useState([])
	const [catalogs, setCatalogs] = useState([])


	const [columns] = useState([
		{ name: 'Artist Name', title: 'artist_name'},
		{ name: 'Catalog Number', title: 'catalog_number'},
		{ name: 'Description', title: 'description'},
		{ name: 'Item Type', title: 'item_type'},
		{ name: 'Transaction Type', title: 'transaction_type'},
		{ name: 'Vendor', title: 'vendor'},
		{ name: 'Update Value	', title: 'update_value'},
	])

	useEffect(() => {
		fetch('http://localhost:5000/expense/matching-errors')
		.then(res => res.json())
		.then(json =>
			{
				setArtistMatchingErrors(json[0]['artist_matching_errors'])
				setCatalogMatchingErrors(json[0]['catalog_matching_errors'])
				setTypeMatchingErrors(json[0]['type_matching_errors'])
			})
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
	
	useEffect(() => {
		fetch('http://localhost:5000/catalog')
		.then(res => res.json())
		.then(json => setCatalogs(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])
	
	const catalogChoices = catalogs.map((catalog) =>
		{
			return (
				<option
					id={catalog.catalog_number}
					value={catalog.catalog_id}
				>{catalog.catalog_number}
				</option>
			)
	})

	function updateArtist(e) {
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
		.then(json => setArtistMatchingErrors(json[0]['artist_matching_errors']))
		.catch(res => setMsg('Error fetching data'))
	}

	function updateCatalog(e) {
		e.preventDefault()
		var catalog_number = e.target.catalog_number_old.value
		// select which elements to update on
		fetch('http://localhost:5000/expense/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{
					'catalog_number': e.target.new_catalog.value,
					'data_to_match' : 
						[
							{
							'catalog_number': catalog_number
							}
						]
		})}
		)
		.then(res => fetch('http://localhost:5000/expense/matching-errors'))
		.then(res => res.json())
		.then(json => setCatalogMatchingErrors(json[0]['catalog_matching_errors']))
		.catch(res => setMsg('Error fetching data'))
	}

	function updateExpenseType(e) {
		var id = e.target.id.value
		e.preventDefault()
		fetch('http://localhost:5000/expense/update-errors', {
			method: 'PUT',
			body: JSON.stringify(
				{
					'expense_type': e.target.new_expense_type.value,
					'data_to_match' : 
						[
							{
							'id': id
							}
						]
		})}
		)
		.then(res => fetch('http://localhost:5000/expense/matching-errors'))
		.then(res => res.json())
		.then(json => setTypeMatchingErrors(json[0]['type_matching_errors']))
		.catch(res => setMsg('Error fetching data'))
	}

	const artistErrorRows = artistMatchingErrors.map((row) =>
		{
			return (
				<TableRow>
						<input type="hidden"
							form={`artistForm${row.id}`}
							id="artist_name_old"
							value={row.artist_name}
							/>
						<Box border={1}>
							<TableCell
							id="artist_name">
							{ row.artist_name }
							</TableCell>
						</Box>
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
									form={`artistForm${row.id}`}
									id="new_artist">
								{artistChoices}
								</select>
							</TableCell>
							<TableCell>
								<form
									id={`artistForm${row.id}`}
									onSubmit={updateArtist}
									>
									<Button
										type="submit"
										id="artist_update">
									Update
									</Button>
								</form>
							</TableCell>
					</TableRow>
				)
		})

		const catalogErrorRows = catalogMatchingErrors.map((row) =>
			{
				return (
					<TableRow>
							<input type="hidden"
								form={`catalogForm${row.id}`}
								id="catalog_number_old"
								value={row.catalog_number}
								/>
							<TableCell
								id="artist_name">
								{ row.artist_name }
							</TableCell>
							<Box border={1}>
							<TableCell
								id="catalog_number">
							{ row.catalog_number }
							</TableCell>
							</Box>
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
									form={`catalogForm${row.id}`}
									id="new_catalog">
								{catalogChoices}
								</select>
							</TableCell>
							<TableCell>
								<form
									id={`catalogForm${row.id}`}
									onSubmit={updateCatalog}
									>
									<Button
										type="submit"
										id="catalog_update">
									Update
									</Button>
								</form>
							</TableCell>
					</TableRow>
				)
		})

		const typeMatchingErrorRows = typeMatchingErrors.map((row) =>
			{
				return (
					<TableRow>
							<input type="hidden"
								form={`expenseForm${row.id}`}
								id="id"
								value={row.id}
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
						<Box border={1}>
							<TableCell
									id="expense_type"
									value={row.expense_type}>
							{ row.expense_type }
							</TableCell>
						</Box>
						<TableCell
								id="vendor">
						{ row.vendor }
						</TableCell>
						<TableCell>
							<select
								form={`expenseForm${row.id}`}
								id="new_expense_type">
								<option
									id="advance"
									value="advance"
								>Advance
								</option>
								<option
									id="recoupable"
									value="recoupable"
								>Recoupable
								</option>
							</select>
						</TableCell>
						<TableCell>
							<form
								id={`expenseForm${row.id}`}
								onSubmit={updateExpenseType}
								>
								<Button
									type="submit"
									id="type_update">
								Update
								</Button>
							</form>
						</TableCell>
				</TableRow>
			)
	})

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
			{artistErrorRows}
			{catalogErrorRows}
			{typeMatchingErrorRows}
			</Table>
		</Container>
		);
}


export default ExpenseTable
