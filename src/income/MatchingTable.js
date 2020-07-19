import React, { useState, useEffect } from 'react';
import { useTable } from "react-table"

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function MatchingTable({ columns, data }, props) {

	const {
		getTableProps, // table props from react-table
		getTableBodyProps, // table body props from react-table
		headers, // headerGroups, if your table has groupings
		rows, // rows for the table based on the data passed
		prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
		} = useTable({
			columns,
				data,
		})

	const history = useHistory()

	const useStyles = makeStyles({
		  table: {
				    minWidth: 650,
				  },
	});

	const classes = useStyles();


	function handleUpdate(data) {
		console.log(data)
	}

	return (
		<TableContainer component={Paper}>
		<Table className={classes.table} size="small"
			id="matching_error_table"
			{...getTableProps()}>
		<TableHead>
			<TableRow>
				{headers.map(column => (
					<TableCell {...column.getHeaderProps()}>
						{column.render('Header')}
					</TableCell>
				))}
			</TableRow>
			))}
		</TableHead>
		<TableBody>
			{
			// 	matchingErrors.map((row) => (
			// 							<TableRow key={row.id}>
			// 								<TableCell align="right">{row.distributor}</TableCell>
			// 								<TableCell align="right">{row.upc_id}</TableCell>
			// 								<TableCell align="right">{row.isrc_id}</TableCell>
			// 								<TableCell align="right">{row.version_id}</TableCell>
			// 								<TableCell align="right">{row.catalog_id}</TableCell>
			// 								<TableCell align="right">{row.album_name}</TableCell>
			// 								<TableCell align="right">{row.track_name}</TableCell>
			// 								<TableCell align="right">{row.type}</TableCell>
			// 								<TableCell align="right">{row.medium}</TableCell>
			// 								<TableCell align="right">{row.description}</TableCell>
			// 								<TableCell align="right">{row.amount}</TableCell>
			// 								<TableCell align="right">
			// 									<select>
			// 										<option>Version1</option>
			// 										<option>Version2</option>
			// 									</select>
			// 								</TableCell>
			// 								<TableCell align="right">
			// 									<Button
			// 										variant="contained"
			// 										color="primary"
			// 										id={row.id}
			// 										type="submit"
			// 										name="update"
			// 										onClick={handleUpdate}
			// 										>
			// 										Update
			// 									</Button>
			// 								</TableCell>
			// 								<TableCell align="right">
			// 									<Button
			// 										variant="contained"
			// 										color="secondary"
			// 										id={row.id}
			// 										name="delete"
			// 										>
			// 										Delete
			// 									</Button>
			// 								</TableCell>
			// 							</TableRow>
			// 	))
			}
		</TableBody>
		{ props.msg }
		</Table>
		</TableContainer>
		);
}


export default MatchingTable
