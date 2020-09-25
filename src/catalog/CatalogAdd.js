import React from 'react'

import { useHistory } from 'react-router-dom'

import CatalogForm from './CatalogForm'
import VersionInfo from './VersionInfo'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import EditButton from '../components/EditButton'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogAdd() {

	const history = useHistory();

	const classes = useStyles()

	function handleCancel(props) {
			history.push('/catalog/')
	}

	return (
		<Container>
			<Header name='New Catalog Item'/>
				<Grid container justify="flex-end">
					<Grid item xs={2} style={{marginBottom: 20}}>
						<EditButton handleCancel={handleCancel}/>
					</Grid>
				</Grid>
			<Grid container 
				spacing={4}
				direction="column"
				justify="space-evenly"
				>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<CatalogForm/>
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

export default CatalogAdd
