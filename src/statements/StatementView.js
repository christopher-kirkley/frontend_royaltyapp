import React, { useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';

import Header from '../components/Header'

function StatementView() {

	const history = useHistory()

	const [msg, setMsg] = useState([]);
	const [statements, setStatements] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/statements/view')
		.then(res => res.json())
		.then(json => setStatements(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

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
				<Header name='View Statements'/>
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
							<TableCell>
							<Button
								variant="contained"
								color="secondary"
								id="delete"
								value={row.id}
								onClick={handleDelete}
								fullWidth
								>
								Delete
								</Button>
							</TableCell>
					</TableRow>
				)}
				</Table>
			</Container>
		)
	}


export default StatementView
