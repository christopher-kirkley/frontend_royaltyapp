import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import CatalogForm from './CatalogForm'
import VersionForm from './VersionForm'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import EditButton from '../components/EditButton'
import Toggle from '../components/Toggle'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogDetail(props) {

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
			fetch('http://localhost:5000/version', {
				method: 'POST',
				body: JSON.stringify(
					{'catalog': id,
						'version': data['newVersion']})
								})
		}

	}


	function updateVersion(data) {
		if (data['version'])
		{
			fetch('http://localhost:5000/version', {
								method: 'PUT',
								body: JSON.stringify(
													{'catalog': id,
														'version': data['version']})
							})

			}
	}
		

				// .then(res => res.json())
				// .then(res => fetch(`http://localhost:5000/catalog/${id}`))
				// .then(res => res.json())
				// .then((json) => {
				// 				json['version'].sort((a, b) => a.id - b.id);
				// 				setVersion(json['version'])
				// 			})
				// .then(res => reset(version))
				// .then(res => setEdit(!edit))


	function onSubmit(data) {
		setEdit(!edit)
		
		const catalog_number = data.catalog_number
		const catalog_name = data.catalog_name
		const artist_id = data.artist_id

		const versions = data['version'] ? data['version'] : ''
		const newVersions = data['newVersion'] ? data['newVersion'] : ''

		// send json to update
		fetch(`http://localhost:5000/catalog/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ catalog_number, catalog_name, artist_id }),
		})
		.then(res => res.json())
		.then(res => 
							fetch('http://localhost:5000/version', {
												method: 'PUT',
												body: JSON.stringify(
																	{'catalog': id,
																		'version': versions})
											}))
		.then(res => res.json())
		.then(res => 
							fetch('http://localhost:5000/version', {
								method: 'POST',
								body: JSON.stringify(
									{'catalog': id,
										'version': newVersions})
												})
		)

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
				</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}

export default CatalogDetail;
