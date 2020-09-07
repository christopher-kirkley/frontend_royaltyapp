import React from 'react'

import CatalogInfo from './CatalogInfo'
import VersionInfo from './VersionInfo'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'

function CatalogItem() {

	return (
		<Container>
			<Header name='Catalog Item'/>
			<Grid container 
				style={{marginTop: 10}}
				spacing={4}
				direction="column"
				justify="space-evenly"
				>
				<Grid item xs={10}>
				<Paper
					elevation={3}
					style={{padding: 10}}
				>
					<CatalogInfo/>
				</Paper>
				</Grid>
				<Grid item xs={10}>
				<Paper
					elevation={3}
					style={{padding: 10}}
				>
					<VersionInfo/>
				</Paper>
				</Grid>
				<Grid item xs={8}>
				<Paper
					elevation={3}
					style={{padding: 10}}
				>
					<TrackInfo/>
				</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CatalogItem
