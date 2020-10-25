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
			<Table id="income_table" size="small">
				<TableRow>
					<TableCell></TableCell>
					<TableCell>Statement Name</TableCell>
					<TableCell>Start Date</TableCell>
					<TableCell>End Date</TableCell>
					<TableCell/>
					<TableCell/>
				</TableRow>
						{
							(Object.keys(props.importedIncome).map((row) =>
									<React.Fragment>
									<TableRow>
										<TableCell style={{backgroundColor: "grey"}}>
											<Typography variant="caption">{row.toUpperCase()}</Typography>
										</TableCell>
									</TableRow>
									{props.importedIncome[row].map((item) => 
										<TableRow>
												<TableCell>
												</TableCell>
												<TableCell>
													{item.statement_name}
												</TableCell>
												<TableCell>
													{item.start_date}
												</TableCell>
												<TableCell>
													{item.end_date}
												</TableCell>
												<TableCell>
													<Grid container spacing={4} justify="flex-end">
														<Grid item xs={3}>
															<Button
																variant="outlined"
																color="primary"
																id={`view${row.id}`}
																value={row.id}
																name="view"
																type="submit"
																onClick={handleClick}
																>
																View
															</Button>
														</Grid>
														<Grid item xs={3}>
															<Button
																variant="outlined"
																color="secondary"
																id={`delete${row.id}`}
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


								</React.Fragment>


							))
						}
		</Table>

		{ 
			// props.importedIncome ?

			// { 
				
				// props.importedIncome.map((row) => 
				// <TableRow>
				// 		<TableCell>
				// 			{row[0]}
				// 		</TableCell>
				// 		<TableCell>
				// 			{row.statement_name}
				// 		</TableCell>
				// 		<TableCell>
				// 			{row.start_date}
				// 		</TableCell>
				// 		<TableCell>
				// 			{row.end_date}
				// 		</TableCell>
				// 		<TableCell>
				// 			<Grid container spacing={4} justify="flex-end">
				// 				<Grid item xs={3}>
				// 					<Button
				// 						variant="outlined"
				// 						color="primary"
				// 						id={`view${row.id}`}
				// 						value={row.id}
				// 						name="view"
				// 						type="submit"
				// 						onClick={handleClick}
				// 						>
				// 						View
				// 					</Button>
				// 				</Grid>
				// 				<Grid item xs={3}>
				// 					<Button
				// 						variant="outlined"
				// 						color="secondary"
				// 						id={`delete${row.id}`}
				// 						value={row.id}
				// 						onClick={handleDelete}
				// 						>
				// 						Delete
				// 						</Button>
				// 				</Grid>
				// 			</Grid>
				// 		</TableCell>
				// </TableRow>
			// )
			}
			<Typography id="income-data" variant="h6" align="center">No data</Typography> 
		}
		</React.Fragment>
		);
}


export default IncomeTable
