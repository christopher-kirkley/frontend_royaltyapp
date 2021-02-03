import React, { useState, useEffect } from 'react'

import { useForm, Controller, defaultValue, useFieldArray } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'


import Header from '../components/Header'
import ConditionalButton from '../components/ConditionalButton'

import BundleFields from './BundleFields'
import VersionFields from './VersionFields'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function BundleForm(props) {

	const classes = useStyles()

	const [catalog, setBundle ] = useState('')

	const [artistId, setArtistId] = useState('1')

	const [version, setVersion] = useState([])


	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => (
				setBundle(json),
				json['version'].sort((a, b) => a.id - b.id),
				setVersion(json['version'])
			))
	}}, [])


	useEffect(() => {
		const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
		const artist_id = catalog && catalog.artist ? catalog.artist.id : 1;
		
		setValue([
			{catalog_number: catalog.catalog_number},
			{catalog_name: catalog.catalog_name},
			{artist_name: artist_name},
			{artist_id: artist_id},
		])
	}, [catalog])
	
	const { handleSubmit, setValue, control } = useForm()

	const emptyRow = {format: '',
										catalog_id: '',
										upc: '',
										version_name: '',
										version_number: ''}

	const { fields, append, remove } = useFieldArray(
				{ control,
					name: 'version',
					name: 'newVersion',
						}
				)

	const emptyTrackRow = { track_number: '',
													isrc: '',
													artist_id: 1,
													track_name: ''}


	return (
		<React.Fragment>
			<form onSubmit={handleSubmit(props.onSubmit)} id="form">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.paper}>
					<Typography variant="h6" color="textSecondary" align="center">Bundle Info</Typography>
					<BundleFields
						setValue={setValue}
						control={control}
						edit={props.edit}/>
					</Paper>
				</Grid>
			</Grid>
	{/*----------- Versions ---------- */}
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.paper}>
					<Grid container justify="space-between">
						<Grid item xs={1} >
							<Typography color="textSecondary" component="h6" variant="caption" align="center">VERSIONS</Typography>
						</Grid>
						<VersionFields
							setValue={setValue}
							setVersion={setVersion}
							control={control}
							edit={props.edit}
							version={version}
							append={append}
							remove={remove}
							fields={fields}
						/>
					</Grid>
				</Paper>
			</Grid>
		</form>
		</React.Fragment>
	)
}

export default BundleForm
