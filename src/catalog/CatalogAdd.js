import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

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

import VersionDisplay from './VersionDisplay'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogAdd() {

	const { id } = useParams()

	const [edit, setEdit] = useState(true)

	function handleEdit() {
		setEdit(!edit)
	}

	const history = useHistory();

	const classes = useStyles()

	function handleCancel(props) {
			history.push('/catalog/')
	}

	function onSubmit(data) {
		setEdit(!edit)
		
		console.log(data)

		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id
		
		fetch('http://localhost:5000/catalog', {
			method: 'POST',
			body: JSON.stringify({ catalog_number, catalog_name, artist_id })
		})
		.then(res => res.json())
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
					<CatalogForm onSubmit={onSubmit} edit={edit} />
				</Paper>
				</Grid>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					<VersionDisplay onSubmit={onSubmit} edit={edit}/>
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
