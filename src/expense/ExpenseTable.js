import React from 'react';

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

function ExpenseTable(props) {

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
		<React.Fragment>
		{ props.importedExpense.length > 0 ?
				<Table id="imported_expense_table">
				<TableRow>
						<TableCell>
						Statement Name
						</TableCell>
						<TableCell/>
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
				:
				<Typography id="income-data" variant="h6" align="center">No data</Typography> 
		}
		</React.Fragment>
		);
}


export default ExpenseTable
