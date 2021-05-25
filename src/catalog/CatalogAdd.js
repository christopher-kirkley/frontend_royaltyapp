import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import CatalogForm from './CatalogForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import EditButton from '../components/EditButton'

import VersionDisplay from './VersionDisplay'

import { makeStyles } from '@material-ui/core/styles'

import { service } from '../_services/services';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogAdd() {

	const [catalogId, setCatalogId] = useState(1)

	const [edit, setEdit] = useState(true)

	function handleEdit() {
		setEdit(!edit)
	}

	const history = useHistory();

	const classes = useStyles()

	function handleCancel(props) {
			history.push('/catalog/')
	}

	function addVersion(data, id) {
		const newVersion = data['newVersion'] ? data['newVersion'] : ''
		
		const obj = {
			'catalog': id,
			'version': newVersion }
		
		service.postData('version', obj)
		.then(res => console.log(res))
		}

	function addTracks(data, id) {
		const newTrack = data['newTrack'] ? data['newTrack'] : ''

		const obj = {
			'catalog': id,
			'track': newTrack }
			
		service.postData('track', obj)
	}

	function onSubmit(data) {
		setEdit(!edit)
		
		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id
		
		const obj = { catalog_number, catalog_name, artist_id }
		service.postData('catalog', obj)
		.then(res => res['id'])
		.then(id => (
			addVersion(data, id),
			addTracks(data, id))
		)

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
					<CatalogForm onSubmit={onSubmit} edit={edit} />
				</Grid>
			</Grid>
		</Container>
	)
}

export default CatalogAdd
