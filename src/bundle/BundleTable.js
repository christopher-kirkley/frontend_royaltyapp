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

import { service } from '../_services/services.js'


function BundleTable() {

	// const { catalogContext, artistContext } = useContext(Context)

	// const [catalog, setCatalog] = catalogContext
	
	const [ bundle, setBundle ] = useState([])

	const history = useHistory()

	useEffect(() => { 
		service.getAll('bundle')
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.bundle_number < b.bundle_number) {return -1;}
				if(a.bundle_number > b.bundle_number) {return 1;}
			})
			setBundle(sorted)
		})
	}, [])

	function handleBundleDetail(id) {
		history.push(`/bundle/${id}`)
	}

	return (
		<div>
		{bundle.length == 0 ?
			<Typography id="bundle-data" variant="h6" align="center">No data</Typography> :
		<TableContainer>
		<Table id="bundle_table" size="small">
			<TableHead>
				<TableRow>
					<TableCell>Bundle Number</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>Version</TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{bundle.map((bundleitem, i) => {
					return (
						<TableRow key={i}>
							<TableCell>{bundleitem.bundle_number}</TableCell>
							<TableCell>{bundleitem.bundle_name}</TableCell>
							<TableCell>
							{bundleitem.version_bundle.map((versionitem, i) => {
								return (
									<Typography variant="caption">{versionitem.version_number} </Typography>
								)
							})}
							</TableCell>
							<TableCell></TableCell>
							<TableCell>
								<Button
									size="small"
									id="bundle_detail"
									variant="outlined"
									color="primary"
									onClick={()=>handleBundleDetail(bundleitem.id)}>
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


export default BundleTable
