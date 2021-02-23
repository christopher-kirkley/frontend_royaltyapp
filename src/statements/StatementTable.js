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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function StatementTable(props) {

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

	return (
		<React.Fragment>
		{ props.statements.length > 0
			?
			<Table id="statement_table">
			{ props.statements.map((row) => 
			<TableRow>
					<TableCell>
						{row.statement_detail_table}
					</TableCell>
					<TableCell>
					<Button
						variant="outlined"
						color="primary"
						id={`view-${row.id}`}
						value={row.id}
						name="submit"
						type="submit"
						onClick={props.handleClick}
						>
						View
						</Button>
					</TableCell>
					<TableCell>
					<Button
						variant="outlined"
						color="secondary"
						id={`edit-${row.id}`}
						value={row.id}
						name="edit"
						type="submit"
						onClick={props.handleEdit}
						>
						Edit
						</Button>
					
					</TableCell>
			</TableRow>
		)}
		</Table>
		:
		<Typography id="statement_table" variant="h6" align="center">No data</Typography> 
		}
		</React.Fragment>
		)
	}


export default StatementTable
