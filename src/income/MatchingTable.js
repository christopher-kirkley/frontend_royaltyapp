import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from "material-table";

import { makeStyles, useTheme } from '@material-ui/core/styles';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'upc_id', headerName: 'UPC', width: 130 },
  { field: 'distributor', headerName: 'Distributor', width: 130 },
  { field: 'catalog_id', headerName: 'Catalog', width: 130 },
  { field: 'medium', headerName: 'Medium', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'description', headerName: 'Description', width: 300 },
];

function MatchingTable(props) {

	const [ numSelected, setNumSelected ] = useState()

	const [ selected, setSelected ] = useState([])

	function handleDelete(e, data){
		console.log(data)
	}

	
	return (
			<div style={{ height: 700, width: '100%' }}>
			<MaterialTable
				data={props.rows}
				columns={columns}
				options={{
					selection: true
				}}
				actions={[
					{
					icon: 'delete',
					onClick: (evt, data) => handleDelete(evt, data)
					
					}
				]}
			/>
			</div>
		)
}


export default MatchingTable
