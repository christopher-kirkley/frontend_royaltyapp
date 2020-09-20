import React from 'react'

import CatalogInfo from './CatalogInfo'
import VersionInfo from './VersionInfo'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogItem() {

	const classes = useStyles()

	return (
		<Container>
			<Header name='Catalog Item'/>
			<Grid container 
				spacing={4}
				direction="column"
				justify="space-evenly"
				>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<CatalogInfo/>
				</Paper>
				</Grid>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<VersionInfo/>
				</Paper>
				</Grid>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<TrackInfo/>
				</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CatalogItem
