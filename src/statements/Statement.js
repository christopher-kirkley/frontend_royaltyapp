import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from '../components/Header'

import { makeStyles } from '@material-ui/core/styles';

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
		fetch('http://localhost:5000/statements/view')
		.then(res => res.json())
		.then(json => setStatements(json))
		.catch(res => setMsg('Error fetching data'))
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
		fetch(`http://localhost:5000/statements/${id}`, {
			method: 'DELETE'
		})
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
								<Grid container spacing={1} item xs={3} >
									<Grid item xs={1}>
										<Button
											id="generate"
											size="small"
											variant="contained"
											onClick={()=>handleGenerate()}
											>
										Generate
										</Button>
									</Grid>
								</Grid>
				<Table id="statement_table">
					<TableRow>
						<TableCell>
						Statement Name
						</TableCell>
						<TableCell/>
					</TableRow>
				{ statements.map((row) => 
					<TableRow>
							<TableCell>
								{row.statement_detail_table}
							</TableCell>
							<TableCell>
							<Button
								variant="contained"
								color="primary"
								id={row.id}
								value={row.id}
								name="submit"
								type="submit"
								fullWidth
								onClick={handleClick}
								>
								View
								</Button>
							</TableCell>
							<TableCell>
							<Button
								variant="contained"
								id="edit"
								value={row.id}
								onClick={handleEdit}
								fullWidth
								>
								Edit
								</Button>
							</TableCell>
					</TableRow>
				)}
				</Table>
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
