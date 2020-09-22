import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


function DetailImportedExpenseTable(props) {

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


export default DetailImportedExpenseTable
