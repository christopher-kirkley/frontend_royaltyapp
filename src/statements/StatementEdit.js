import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory, useParams } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';
import {
	  MuiPickersUtilsProvider,
	  KeyboardTimePicker,
	  KeyboardDatePicker,
} from '@material-ui/pickers';

import Header from '../components/Header'

function StatementEdit() {

	const history = useHistory()

	const { id } = useParams()

	const [msg, setMsg] = useState([]);
	const [versions, setVersions] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/statements/${id}/versions`)
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
	}, [])

	function getVersions() {
		fetch(`http://localhost:5000/statements/${id}/versions`)
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
	}

	const versionRows = versions.map((row) =>
		{
			return (
				<TableRow>
					<TableCell
						id="version_number">
					{ row.version_number }
					</TableCell>
					<TableCell
						id="format">
					{ row.format }
					</TableCell>
					<TableCell
						id="catalog_name">
					{ row.catalog_name }
					</TableCell>
					<TableCell>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleDelete}
							value={ row.id }
							id={ row.id }
						>
							Delete
						</Button>
					</TableCell>
				</TableRow>
				)
		})

	function handleClick() {
		fetch(`http://localhost:5000/statements/${id}/generate-summary`, {
				method: 'POST'
			})
		.catch(error => setMsg('Error uploading'))
	}
	

	function handleDelete(e) {
		const version_id = e.currentTarget.value
		fetch(`http://localhost:5000/statements/${id}/versions/${version_id}`, {
			method: 'DELETE'
		})
		.then(res => fetch(`http://localhost:5000/statements/${id}/versions`))
		.then(res => res.json())
		.then(json => {
			setVersions(json['versions'])
		})
		.catch(res => setMsg('Error fetching data'))
		}

	return (
			<Container>
				<Header name='Edit Statement'/>
				<Grid container spacing={3} style={{marginTop: 8}} alignItems="center">
					<Grid item xs={12}>
					<Paper style={{padding: 10}}>
					<Typography component="h6" variant="h6" gutterBottom>Statement Versions</Typography>
					<Table id='edit-statement' size="small">
						<TableRow>
							<TableCell>Version Number</TableCell>
							<TableCell>Format</TableCell>
							<TableCell>Catalog Name</TableCell>
							<TableCell></TableCell>
						</TableRow>
						{versionRows}
					</Table>
					</Paper>
					</Grid>
					<Grid item xs={12}>
						<Button
							id="update"
							variant="contained"
							color="primary"
							onClick={handleClick}
						>
						Save Changes
						</Button>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default StatementEdit
