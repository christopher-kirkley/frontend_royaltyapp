import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function CatalogTable() {
	
	const [catalog, setCatalog] = useState([])
	
	const history = useHistory()

	useEffect(() => { 
		fetch('http://localhost:5000/catalog')
		.then(res => res.json())
		.then(json => setCatalog(json))
		.then(json => console.log(json))
	}, [])

	function handleCatalogDetail(id) {
		history.push(`/catalog/${id}`)

	}

	return (
		<div>
		<TableContainer>
		<Table id="catalog_table">
			<TableHead>
				<TableRow>
					<TableCell>Catalog Number</TableCell>
					<TableCell>Artist</TableCell>
					<TableCell>Title</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{catalog.map((catalogitem, i) => {
					return (
						<TableRow key={i}>
							<TableCell>{catalogitem.catalog_number}</TableCell>
							<TableCell>{catalogitem.artist.artist_name}</TableCell>
							<TableCell>{catalogitem.catalog_name}</TableCell>
							<TableCell>
								<Button
									id="catalog_detail"
									variant="contained"
									color="primary"
									onClick={()=>handleCatalogDetail(catalogitem.id)}>
										Detail
								</Button>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
			</Table>
			</TableContainer>
		</div>
	)
}


export default CatalogTable
