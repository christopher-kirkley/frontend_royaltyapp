import React from 'react';

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

function IncomeTable(props) {

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
		{ props.importedIncome.length > 0 ?
			<Table id="income_table">
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
							<Grid container spacing={1} justify="flex-end">
								<Grid item xs={2}>
									<Button
										variant="outlined"
										color="primary"
										id={row.id}
										value={row.id}
										name="submit"
										type="submit"
										onClick={handleClick}
										>
										View
									</Button>
								</Grid>
								<Grid item xs={2}>
									<Button
										variant="outlined"
										color="secondary"
										id="delete"
										value={row.id}
										onClick={handleDelete}
										>
										Delete
										</Button>
								</Grid>
							</Grid>
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


export default IncomeTable
