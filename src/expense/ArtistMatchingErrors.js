import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Header from '../components/Header'
import ExpenseMatchingTable from './ExpenseMatchingTable'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function ArtistMatchingErrors(props) {

	const history = useHistory()

	const [rows, setRows] = useState([])

	const [ updated, setUpdated ] = useState('')

	const [ alert, setAlert ] = useState(false)

	function getArtistMatchingErrors() {
		fetch('http://localhost:5000/expense/artist-matching-errors')
		.then(res => res.json())
		.then(json => setRows(json))
	}

	useEffect(() => {
		getArtistMatchingErrors()
	}, rows)


	return (
		<Container>
		<Header name='Artist Matching Errors'/>
			<Grid container direction="row" >
				<Grid item xs={12}>
					<Alert severity="error">You have { rows.length} artist matching errors</Alert>
					<Divider style={{marginTop: 10}}/>
					<Paper>
					<ExpenseMatchingTable
						rows={rows}
						setRows={setRows}
						setUpdated={setUpdated}
						setAlert={setAlert}
						type={'artist'}
						getMatchingErrors={getArtistMatchingErrors}
					/>
					</Paper>
				</Grid>
				</Grid>

			<Snackbar open={alert}
				autoHideDuration={1500}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				onClose={()=>setAlert(false)}
			>
				<Alert severity="success">
				Updated {updated} errors!
				</Alert>
			</Snackbar>

			</Container>
		)
	}


export default ArtistMatchingErrors
