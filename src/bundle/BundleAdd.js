import React, { useState } from 'react'

import { useParams } from 'react-router-dom'

import { useHistory } from 'react-router-dom'

import BundleForm from './BundleForm'

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

function BundleAdd() {

	const [bundleId, setBundleId] = useState(1)

	const [edit, setEdit] = useState(true)

	function handleEdit() {
		setEdit(!edit)
	}

	const history = useHistory();

	const classes = useStyles()

	function handleCancel(props) {
			history.push('/bundle/')
	}

	function onSubmit(data) {
		setEdit(!edit)
		
		const bundle_number = data.bundle_number
		const bundle_name = data.bundle_name
		const bundle_version = data.newBundleVersion
		
		fetch('http://localhost:5000/bundle', {
			method: 'POST',
			body: JSON.stringify({ bundle_number, bundle_name, bundle_version })
		})

	}

	return (
		<Container>
			<Header name='New Bundle Item'/>
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
					<BundleForm onSubmit={onSubmit} edit={edit} />
				</Grid>
			</Grid>
		</Container>
	)
}

export default BundleAdd
