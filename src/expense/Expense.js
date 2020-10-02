import React, { useState, useEffect } from 'react'


import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

import Header from '../components/Header'
import ExpenseTable from './ExpenseTable'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Expense() {

	const history = useHistory()

	const classes = useStyles()

	const [ importedExpense, setImportedExpense ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => (setImportedExpense(json)))
	}, [])

	function getImportedExpense() {
		fetch('http://localhost:5000/expense/imported-statements')
		.then(res => res.json())
		.then(json => setImportedExpense(json))
	}

	function handleImport() {
		history.push('/expense/import')
	}

	function handleAdd() {
		history.push('/expense/add')
	}

	return (
			<Container>
				<Header name='Expense'/>
				<Grid container direction="row" >
					<Grid item xs={12}>
						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid item xs={2} >
									<Typography color="textSecondary" component="h6" variant="caption" align="center">EXPENSE STATEMENTS</Typography>
								</Grid>
								<Grid container spacing={1} item xs={3} >
									<Grid item >
										<Button
											id="add_expense"
											size="small"
											variant="contained"
											color="secondary"
											onClick={handleAdd}
											>
										Add
										</Button>
									</Grid>
									<Grid item xs={1}>
										<Button
											id="import_expense"
											size="small"
											variant="contained"
											onClick={handleImport}
											>
										Import
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<ExpenseTable
								importedExpense={importedExpense}
								getImportedExpense={getImportedExpense}
							/>
							</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default Expense
