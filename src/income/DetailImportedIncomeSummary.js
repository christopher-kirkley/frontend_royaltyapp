import React from 'react';

import { useHistory } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


function DetailImportedIncomeSummary(props) {

	return (
		<React.Fragment>
			<Typography color="textSecondary" align="center" component="h2" variant="h5" gutterBottom>
				Income Statement Summary
			</Typography>
			<Grid container alignItems="center" justify="center">
			<Grid item xs={8}>
			<Table size="small">
				<TableRow>
					<TableCell>
						<Typography component="p" variant="p">Statement Name</Typography>
					</TableCell>
					<TableCell>
						<Typography component="p" variant="p" id="statement_name">
						{props.summary.statement_name}
						</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography component="p" variant="p">
						Number of Records
						</Typography>
					</TableCell>
					<TableCell>
					<Typography component="p" variant="p" id="number_of_records">
					{props.summary.number_of_records}
					</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography component="p" variant="p">Total Amount</Typography>
					</TableCell>
					<TableCell>
						<Typography component="p" variant="p">
						{props.summary.amount}
					</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography component="p" variant="p">Label Fees</Typography>
					</TableCell>
					<TableCell>
						<Typography component="p" variant="p">
						{props.summary.label_fee}
						</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography component="p" variant="p">Label Net</Typography>
					</TableCell>
					<TableCell>
						<Typography component="p" variant="p">
						{props.summary.label_net}
						</Typography>
					</TableCell>
				</TableRow>
			</Table>
			</Grid>
			</Grid>
		</React.Fragment>
		);
}


export default DetailImportedIncomeSummary
