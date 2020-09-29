import React, { useState, useEffect } from 'react';

import IncomeTable from './IncomeTable'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Income() {

	const classes = useStyles()

	const history = useHistory()

	const [ importedIncome, setImportedIncome ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/income/imported-statements')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}, [])

	function getImportedIncome() {
		fetch('http://localhost:5000/income/imported-statements')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}

	function handleImport() {
		history.push('/income/import')
	}

	function handleAdd() {
		history.push('/income/add')
	}


		return (
			<Container>
				<Header name='Income'/>
				<Grid container direction="row" >
					<Grid item xs={12}>
						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid item xs={3} >
									<Typography color="textSecondary" component="h6" variant="caption" align="center">INCOME STATEMENTS</Typography>
								</Grid>
								<Grid container spacing={1} item xs={3} >
									<Grid item>
										<Button
											id="import_income"
											size="small"
											variant="contained"
											onClick={handleImport}
											>
										Import
										</Button>
									</Grid>
									<Grid item xs={1} >
										<Button
											id="add_income"
											size="small"
											variant="contained"
											color="secondary"
											onClick={handleAdd}
											>
										Add
										</Button>
									</Grid>
								</Grid>
							</Grid>
							<IncomeTable
								importedIncome={importedIncome}
							/>
							</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default Income
