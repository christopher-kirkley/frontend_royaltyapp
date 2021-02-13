import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Header from '../components/Header'
import BundleImportDetail from './BundleImportDetail'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Import () {
	const classes = useStyles()

	return (
			<Container>
				<Header name='Import CSV'/>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<BundleImportDetail/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		
	)
}

export default Import

