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
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


function ImportedIncomeTable(props) {

	const history = useHistory()

	function handleClick(e) {
		const id = e.currentTarget.value
		history.push(`/income/${id}`)
	}

	function handleDelete(e) {
		const id = e.currentTarget.value
		fetch(`http://localhost:5000/income/statements/${id}`, {
			method: 'DELETE'
		})
		.then(res => {props.getImportedIncome()})
		}


	return (
		<React.Fragment>
			<Typography color="textSecondary" component="h2" variant="h5" align="center">Income Statements</Typography>
		{ props.importedIncome.length > 0 ?
			<Table id="imported_income_table">
				<TableRow>
					<TableCell>
					Statement Name
					</TableCell>
					<TableCell/>
					<TableCell/>
				</TableRow>
			{ props.importedIncome.map((row) => 
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
			:
			<Typography align="center">No data</Typography>
		}
		</React.Fragment>
		);
}


export default ImportedIncomeTable
