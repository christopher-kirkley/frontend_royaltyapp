import React, { useState, useEffect } from 'react'


import { Redirect, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import { jsPDF } from "jspdf";

import domtoimage from 'dom-to-image';

import ReactPDF from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function StatementSummary() {


	const classes = useStyles()

	const history = useHistory()

	const { id } = useParams()

	const [statementName, setStatementName] = useState([])
	const [detail, setDetail] = useState([])
	const [summary, setSummary] = useState({})

	function handleClick(e) {
		const artistId = e.currentTarget.value
		history.push(`/statements/${id}/artist/${artistId}`)
	}

	function handleExport() {
		console.log('h')
		
		window.print()
		// var content = document.getElementById("statement-summary")
		// var pri = document.getElementById("ifmcontentstoprint").contentWindow;
		// pri.document.open();
		// pri.document.write(content.innerHTML);
		// pri.document.close();
		// pri.focus();
		// pri.print();

		// const MyDocument = () => (
		// 	<Document>
		// 		<Page size="A4">
		// 			<View>
		// 				<Text>Section #1</Text>
		// 			</View>
		// 			<View>
		// 				<Text>Section #2</Text>
		// 			</View>
		// 		</Page>
		// 	</Document>
		// )

		// const saveBlob = (blob, filename) => {
		// 	var a = document.createElement("a");
		// 	document.body.appendChild(a);
		// 	a.style.display = "none";
		// 	let url = window.URL.createObjectURL(blob);
		// 	a.href = url;
		// 	a.download = filename;
		// 	a.click();
		// 	window.URL.revokeObjectURL(url);
		// };

		// const savePdf = async (document, filename) => {
		// 	saveBlob(await pdf(document).toBlob(), filename);
		// };

		// savePdf(<MyDocument/>, "my-doc.pdf")
			
	}

	function handleExportCSV() {
		fetch('http://localhost:5000/statements/export-csv')
	}

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				const sorted = [...json['detail']].sort(function(a, b){
					if(a.artist_name < b.artist_name) {return -1;}
					if(a.artist_name > b.artist_name) {return 1;}
				})
				setDetail(sorted)
				setSummary(json['summary'])
				setStatementName(json['summary']['statement'])
			})
		}
	}, [])


	const detailRows = detail.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="artist_name">
					{ row.artist_name }
					</TableCell>
					<TableCell
						id="balance_forward">
					{ row.balance_forward }
					</TableCell>
					<TableCell>
						<Button
							color="primary"
							variant="outlined"
							size="small"
							onClick={handleClick}
							value={ row.id }
							id={`view-${row.id}`}
						>
							View
						</Button>
					</TableCell>
					<TableCell>
						<Button
							color="secondary"
							variant="outlined"
							size="small"
							onClick={handleExport}
							value={ row.id }
							id={`export-${row.id}`}
						>
							Export
						</Button>
					</TableCell>
				</TableRow>
				)
		})

	return (
			<Container id="statement-summary">
				<Header name="Statement Summary"/>

				<Grid container
					spacing={3}>
						<Grid item xs={9}>
							<Typography id="statement-name" component="h5" variant="h6">{statementName}</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button
								color="primary"
								variant="outlined"
								onClick={handleExportCSV}
							>
							EXPORT CSV
							</Button>
						</Grid>
						<Grid item xs={12}>
						<Paper
							elevation={3}
							className={classes.paper}
					 	>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography id="title" component="h5" variant="caption">OVERVIEW</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography id="current-owed" component="h6" variant="subtitle1">Current Owed: ${summary['statement_total']}</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography id="previous-balance" component="h6" variant="subtitle1">Previous Balance Table: {summary['previous_balance']}</Typography>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper
							elevation={3}
							className={classes.paper}
						>
						<Table id="statement_summary_table" size="small">
							<TableRow>
								<TableCell>Artist</TableCell>
								<TableCell>Open Balance</TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
							</TableRow>
							{detailRows}
						</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default StatementSummary
