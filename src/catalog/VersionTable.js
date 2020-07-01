import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function VersionTable() {
	
	// const [version, setVersion] = useState([])
	
	// const history = useHistory()

	// useEffect(() => { 
	// 	fetch('http://localhost:5000/version')
	// 	.then(res => res.json())
	// 	.then(json => setVersion(json))
	// }, [])

	// function handleCatalogDetail(e) {
	// 	const id = e.target.value
	// 	history.push(`/catalog/${id}`)

	// }

	function handleClick() {
		console.log('e')
	}


	return (
		<div>
		<TableContainer>
		<form>
		<Table id="version_table">
			<TableHead>
				<TableRow>
					<TableCell>UPC</TableCell>
					<TableCell>Version Number</TableCell>
					<TableCell>Description</TableCell>
					<TableCell>Format</TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>
						<input type="text" name="upc" id="upc"/>
					</TableCell>
					<TableCell>
						<input type="text" name="version_number" id="version_number"/>
					</TableCell>
					<TableCell>
						<input type="text" name="description" id="description"/>
					</TableCell>
					<TableCell>
						<input type="text" name="format" id="format"/>
					</TableCell>
					<TableCell>
						<Button
							variant="contained"
							color="primary"
							id="update"
							name="update"
							onclick={handleClick}>Update</Button>
					</TableCell>
					<TableCell>
						<Button variant="contained" color="secondary" id="delete" name="delete">Delete</Button>
					</TableCell>
				</TableRow>
		{
				// {catalog.map((catalogitem, i) => {
				// 	return (
				// 		<TableRow key={i}>
				// 			<TableCell>{catalogitem.catalog_number}</TableCell>
				// 			<TableCell>{catalogitem.artist.artist_name}</TableCell>
				// 			<TableCell>{catalogitem.catalog_name}</TableCell>
				// 			<TableCell>
				// 				<Button id="catalog_detail" value={catalogitem.id} onClick={handleCatalogDetail}>Detail</Button></TableCell>
				// 		</TableRow>
				// 	)
				// })}
		}
			</TableBody>
			</Table>
			</form>
			</TableContainer>
		</div>
	)
}


export default VersionTable
