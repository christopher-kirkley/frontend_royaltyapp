import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from '../components/Header'

import StatementTable from './StatementTable'

import { makeStyles } from '@material-ui/core/styles';

import { service } from '../_services/services.js'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Statement() {

	const history = useHistory()

	const classes = useStyles()
	const [msg, setMsg] = useState([]);
	const [statements, setStatements] = useState([]);

	useEffect(() => {
		service.getAll('statements')
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.statement_summary_table < b.statement_summary_table) {return -1;}
				if(a.statement_summary_table > b.statement_summary_table) {return 1;}
			})
			setStatements(sorted)
		})
	}, [])

	function handleGenerate() {
		history.push('/statements/generate')
	}

	function handleClick(e) {
		const id = e.currentTarget.value
		history.push(`/statements/${id}`)
	}

	function handleDelete(e) {
		const id = e.currentTarget.value
		service._deleteItem(`http://localhost:5000/statements/${id}`)
		}

	function handleEdit(e) {
		const id = e.currentTarget.value
		history.push(`/statements/${id}/edit`)
		}

	return (
			<Container>
				<Header name='Statements'/>
				<Grid container direction="row" >
					<Grid item xs={12}>
						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid item xs={2} >
									<Typography color="textSecondary" component="h6" variant="caption" align="center">STATEMENTS</Typography>
								</Grid>
								<Grid item xs={1}>
									<Button
										id="generate"
										size="small"
										variant="contained"
										color="secondary"
										onClick={()=>handleGenerate()}
										>
									New
									</Button>
								</Grid>
							</Grid>
							<Grid>
								<StatementTable
									handleClick={handleClick}
									statements={statements}
									handleEdit={handleEdit}
								/>
							</Grid>
							</Paper>
					</Grid>
				</Grid>

		{
				// <Header name='Statements'/>
			// </Container>
		}
			</Container>
		)
	}


export default Statement
