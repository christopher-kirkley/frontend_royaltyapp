import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Header from '../components/Header'
import RefundMatchingTable from './RefundMatchingTable'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { service } from '../_services/services.js'

function RefundMatchingErrors(props) {

	const history = useHistory()

	const [rows, setRows] = useState([])

	const [ updated, setUpdated ] = useState('')

	const [ alert, setAlert ] = useState(false)

	function getRefundMatchingErrors() {
		service.getAll('income/refund-matching-errors')
		.then(json => {
			setRows(json)
			if (json.length === 0 ) {
				history.push('/income/import')
			}
		})
	}

	useEffect(() => {
		getRefundMatchingErrors()
	}, rows)


	return (
		<Container>
		<Header name='Refund Matching Errors'/>
		<Grid container direction="row" >
			<Grid item xs={12}>
				<Alert severity="error">You have { rows.length} refund matching errors</Alert>
				<Divider style={{marginTop: 10}}/>
				<Paper>
				<RefundMatchingTable
					rows={rows}
					setRows={setRows}
					setUpdated={setUpdated}
					setAlert={setAlert}
					getMatchingErrors={getRefundMatchingErrors}
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


export default RefundMatchingErrors
