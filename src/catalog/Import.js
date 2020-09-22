import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import ImportCatalog from './ImportCatalog'
import ImportVersion from './ImportVersion'
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
							<ImportCatalog/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<ImportVersion/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		
	)
}

export default Import

