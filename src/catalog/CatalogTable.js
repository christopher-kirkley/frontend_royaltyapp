import React, { useState, useEffect, useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';


function CatalogTable() {

	const { catalogContext, artistContext } = useContext(Context)

	const [catalog, setCatalog] = catalogContext

	const history = useHistory()

	function handleCatalogDetail(id) {
		history.push(`/catalog/${id}`)
	}

	return (
		<div>
		{catalog.length == 0 ?
			<Typography id="artists-data" variant="h6" align="center">No data</Typography> :
		<TableContainer>
		<Table id="catalog_table" size="small">
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
									size="small"
									id="catalog_detail"
									variant="outlined"
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
		}
		</div>
	)
}


export default CatalogTable
