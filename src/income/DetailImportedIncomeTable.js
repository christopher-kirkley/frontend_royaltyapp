import React, { useState, useEffect } from 'react';
import { useTable } from "react-table"

import { Redirect, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';


function DetailImportedIncomeTable(props) {

	const history = useHistory()

	return (
		<Container component={Paper}>
			<Table id="imported_statement_table">
				<TableRow>
					<TableCell>
					Date
					</TableCell>
					<TableCell>
					Cheese
					</TableCell>
					<TableCell>
					Tacos
					</TableCell>
					<TableCell>
					Potatoes
					</TableCell>
				</TableRow>
			{ props.statement.map((row) => 
				<TableRow>
						<TableCell>
							{row.date}
						</TableCell>
						<TableCell>
						</TableCell>
				</TableRow>
			)}
			</Table>
		</Container>
		);
}


export default DetailImportedIncomeTable
