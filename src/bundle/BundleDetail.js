import React, { useState } from 'react'

import { useParams, useHistory } from 'react-router-dom'

import BundleForm from './BundleForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Header from '../components/Header'
import EditButton from '../components/EditButton'
import Toggle from '../components/Toggle'

import { makeStyles } from '@material-ui/core/styles'
import { service } from '../_services/services';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function BundleDetail(props) {

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

	function onSubmit(data) {
		setEdit(!edit)
		
		const bundle_id = id
		const bundle_number = data.bundle_number
		const bundle_name = data.bundle_name
		const upc = data.upc
		var arr = []
		arr.push.apply(arr, data.bundleVersion)
		arr.push.apply(arr, data.newBundleVersion)
		const bundle_version = arr
	
		const obj = {
			bundle_id,
			bundle_name,
			bundle_number,
			upc,
			bundle_version
		}
		
		service.put(`bundle`, obj)

	}

	function handleDelete() {
		service._delete('bundle', id)
		.then(json => history.push('/bundle/'))
	}

	return (
		<Container>
			<Header name='Bundle Item'/>
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
					<BundleForm onSubmit={onSubmit} id={id} edit={edit} />
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

export default BundleDetail;
