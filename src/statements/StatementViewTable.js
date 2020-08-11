import React, { useState, useEffect } from 'react';
import { useTable } from "react-table"

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';


function ImportedStatementTable(props) {

	const history = useHistory()

	function handleClick(e) {
		const id = e.currentTarget.value
		history.push(`/expense/${id}`)
	}

	function handleDelete(e) {
		const id = e.currentTarget.value
		fetch(`http://localhost:5000/expense/statements/${id}`, {
			method: 'DELETE'
		})
		.then(res => {props.getImportedExpense()})
		}


	return (
		<Container component={Paper}>
			<Table id="imported_expense_table">
				<TableRow>
					<TableCell>
					Statement Name
					</TableCell>
					<TableCell/>
				</TableRow>
			{ props.importedExpense.map((row) => 
				<TableRow>
						<TableCell>
							{row.statement_name}
						</TableCell>
						<TableCell>
						<Button
							variant="contained"
							color="primary"
							id={row.id}
							value={row.id}
							name="submit"
							type="submit"
							fullWidth
							onClick={handleClick}
							>
							View
							</Button>
						</TableCell>
						<TableCell>
						<Button
							variant="contained"
							color="secondary"
							id="delete"
							value={row.id}
							onClick={handleDelete}
							fullWidth
							>
							Delete
							</Button>
						</TableCell>
				</TableRow>
			)}
			</Table>
		</Container>
		);
}


export default ImportedStatementTable
