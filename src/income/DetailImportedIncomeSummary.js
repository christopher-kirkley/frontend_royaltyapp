import React, { useState, useEffect } from 'react';
import { useTable } from "react-table"

import { Redirect, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/core/styles';


function DetailImportedIncomeSummary(props) {

	const history = useHistory()

	return (
		<Paper>
			<Typography color="textSecondary" align="center" component="h2" variant="h5" gutterBottom>
				Income Statement Summary
			</Typography>
			<Grid container alignItems="center" justify="center">
			<Grid item xs={8}>
			<Table>
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
		</Paper>
		);
}


export default DetailImportedIncomeSummary
