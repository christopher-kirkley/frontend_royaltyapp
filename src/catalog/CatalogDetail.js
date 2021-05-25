import React, { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import CatalogForm from './CatalogForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import EditButton from '../components/EditButton'
import Toggle from '../components/Toggle'

import { makeStyles } from '@material-ui/core/styles'

import { service } from '../_services/services.js'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogDetail(props) {

	const history = useHistory();

	const { id } = useParams()

	const classes = useStyles()

	const [edit, setEdit] = useState(false)

	function handleEdit() {
		setEdit(!edit)
	}

	function handleCancel() {
		handleEdit()
	}

	function addVersion(data) {
		if (data['newVersion'])
		{
			const obj = {
				'catalog': id,
				'version': data['newVersion']}
			service.postItem('version', obj)
		}

	}


	function updateVersion(data) {
		if (data['version'])
		{
			const obj = {
				'catalog': id,
				'version': data['version']}
			service.put('version', obj)
			}
	}
		

	function onSubmit(data) {
		setEdit(!edit)
		
		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id

		const versions = data['version'] ? data['version'] : ''
		const newVersions = data['newVersion'] ? data['newVersion'] : ''
		const track = data['track'] ? data['track'] : ''
		const newTrack = data['newTrack'] ? data['newTrack'] : ''

		const obj_catalog = { catalog_number, catalog_name, artist_id }
		const obj_version = { 'catalog': id, 'version': versions }

		const obj_newVersion = { 'catalog': id, 'version': newVersions }
		const obj_track = { 'catalog': id, 'tracks': track }
		const obj_newTrack = { 'catalog': id, 'track': newTrack }

		// send json to update
		service.put(`catalog/${id}`, obj_catalog)
		.then(res => service.put('version', obj_version))
		.then(res => service.postData('version', obj_newVersion) )
		.then(res => service.put('track', obj_track)) 
		.then(res => service.postData('track', obj_newTrack))
	}

	function handleDelete() {
		service._deleteItem('catalog', id)
		.then(json => history.push('/catalog/'))
	}

	return (
		<Container>
			<Header name='Catalog Item'/>
			<Grid container justify="space-between" style={{marginBottom: 20}}>
				<Grid item xs={2}>
					<Toggle
						edit={edit}
						handleEdit={handleEdit}
						/>
				</Grid>
				<Grid item xs={2} >
				{ edit ?
					<EditButton
						edit={edit}
						handleEdit={handleEdit}
						handleCancel={handleCancel}
						/> : null }
				</Grid>
			</Grid>
			<Grid container 
				spacing={4}
				direction="column"
				justify="space-evenly"
				>
				<Grid item xs={12}>
					<CatalogForm onSubmit={onSubmit} id={id} edit={edit} />
				</Grid>
				<Grid item xs={12}>
				</Grid>
				<Grid item xs={12}>
				<Paper elevation={4} className={classes.paper}>
					{ edit ?
						<Button 
							size="small"
							variant="outlined"
							color="secondary"
							id="cancel"
							onClick={handleDelete}
							>
							Delete
						</Button>
						:
						null
					}
				</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CatalogDetail;
