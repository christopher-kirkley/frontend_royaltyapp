import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

	const rows = (Object.keys(props.importedIncome).map((row) =>
		row))

	function Row(props) {
		const { row } = props
		const [open, setOpen] = useState(true);

		return (
			<React.Fragment>
				<TableRow style={{backgroundColor: "#f2f2f2"}}>
					<TableCell>
						<Grid container alignItems="center">
							<Grid item xs={1}>
								 <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
									 {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
								 </IconButton>
							</Grid>
							<Grid item xs={1}>
								<Typography variant="caption">{row.toUpperCase()}</Typography>
							</Grid>
						</Grid>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Table id="income_table" size="small">
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell>Statement Name</TableCell>
										<TableCell>Start Date</TableCell>
										<TableCell>End Date</TableCell>
										<TableCell/>
										<TableCell/>
									</TableRow>
								</TableHead>
								<TableBody>
									{ props.importedIncome && props.importedIncome[row].map((item) =>
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
															id={`view${item.id}`}
															value={item.id}
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
															id={`delete${item.id}`}
															value={item.id}
															onClick={handleDelete}
															>
															Delete
															</Button>
													</Grid>
												</Grid>
											</TableCell>
									</TableRow>
									)}
								</TableBody>
							</Table>
						</Collapse>
					</TableCell>
				</TableRow>

			{
	}



			</React.Fragment>
		)
			
	}

	return (
		    <TableContainer>
		      <Table aria-label="collapsible table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Distributor</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {rows.map((row) => (
								props.importedIncome[row].length > 0  ?
								<Row key={row.name} row={row} importedIncome={props.importedIncome} />
								:
								null
							))
							}

		
	        </TableBody>
		      </Table>
		    </TableContainer>
	)

}


export default IncomeTable
