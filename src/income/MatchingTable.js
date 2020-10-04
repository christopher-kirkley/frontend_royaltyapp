import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';

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

	function handleSelect(e){
		console.log(e.rowIndex)
	}
	
	return (
			<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={props.rows}
				columns={columns}
				pageSize={5}
				checkboxSelection
				onRowSelected={handleSelect}
			/>
			</div>
		)
}


export default MatchingTable
