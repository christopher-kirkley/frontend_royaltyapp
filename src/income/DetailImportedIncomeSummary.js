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
		<Container component={Paper}>
		<div style={{marginTop: 20,
								padding: 10,
								display: "flex", flexDirection: "column",
								alignItems:"center", border: '3px solid black'}}>
			<Grid container spacing={4} id="statement_summary"> 
				<Grid item xs={12}>
				<Typography component="h2" variant="h5">
					Income Statement Summary
				</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">
					Number of Records
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p" id="number_of_records">
					{props.summary.number_of_records}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">Total Amount</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">
					{props.summary.amount}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">Label Fees</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">
					{props.summary.label_fee}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">Label Net</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography component="p" variant="p">
					{props.summary.label_net}
					</Typography>
				</Grid>
			</Grid>
		</div>
		</Container>
		);
}


export default DetailImportedIncomeSummary
