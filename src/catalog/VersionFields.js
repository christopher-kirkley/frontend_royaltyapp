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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Header from '../components/Header'
import ConditionalButton from '../components/ConditionalButton'

import { makeStyles } from '@material-ui/core/styles'
import { service } from '../_services/services';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function VersionFields(props) {

	const classes = useStyles()

	const [catalog, setCatalog ] = useState('')

	useEffect(() => { 
		if (props.id) {
			service.getAll(`catalog/${props.id}`)
			.then(json => setCatalog(json))
	}}, [])

	useEffect(() => {
		const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
		const artist_id = catalog && catalog.artist ? catalog.artist.id : 1;
		
		props.setValue([
			{catalog_number: catalog.catalog_number},
			{catalog_name: catalog.catalog_name},
			{artist_name: artist_name},
			{artist_id: artist_id},
		])
	}, [catalog])
	
	const [artists, setArtists] = useState([])

	useEffect(() => { 
		service.getAll('artists')
		.then(json => setArtists(json))
	}, [])

	const artistChoices = artists.map((artist, i) =>
		<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	)

	function removeVersion(index) {
		const cloneVersion = [...props.version]
		cloneVersion.splice(index, 1) 
		props.setVersion(cloneVersion)
	}

	return (
		<Grid container style={{marginTop: 5}}>

				{
					props.version.map((version, index) => (
						<Grid item container spacing={2} alignItems="center" key={version.id}>
								<Controller
									type="hidden"
									as={TextField}
									control={props.control}
									name={`version[${index}].id`}
									defaultValue={`${version.id}`}
									disabled={props.edit ? false: true}
								/>
							<Grid item xs={3}>
								<Controller
									as={TextField}
									control={props.control}
									name={`version[${index}].upc`}
									defaultValue={`${version.upc}`}
									label='UPC'
										disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2}>
								<Controller
									as={TextField}
									control={props.control}
									name={`version[${index}].version_number`}
									defaultValue={`${version.version_number}`}
									label='Version Number'
										disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={3}>
								<Controller
									as={TextField}
									control={props.control}
									name={`version[${index}].version_name`}
									defaultValue={`${version.version_name}`}
									label='Version Name'
										disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2}>
								<Controller
									as={TextField}
									control={props.control}
									name={`version[${index}].format`}
									defaultValue={`${version.format}`}
									label='Format'
										disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2} align="center">
								<IconButton
									id="delete"
									name="delete"
									onClick={() =>
										removeVersion(index)
										}
								>
									<ClearIcon/>
								</IconButton>
							</Grid>
						</Grid>
							)
							)
				}

				{ 
					props.fields.map((newVersion, index) => (
						<Grid item container spacing={2} alignItems="center" justify="center" key={newVersion.id}>
							<Controller
								type="hidden"
								as={TextField}
								control={props.control}
								name={`newVersion[${index}].id`}
							/>
							<Grid item xs={3}>
								<Controller
									as={TextField}
									control={props.control}
									name={`newVersion[${index}].upc`}
									defaultValue={''}
									label='UPC'
									disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2}>
								<Controller
									as={TextField}
									control={props.control}
									id={`newVersion[${index}].version_number`}
									name={`newVersion[${index}].version_number`}
									defaultValue={''}
									label='Version Number'
									disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={3}>
								<Controller
									as={TextField}
									control={props.control}
									name={`newVersion[${index}].version_name`}
									defaultValue={''}
									label='Version Name'
									disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2}>
								<Controller
									as={TextField}
									control={props.control}
									name={`newVersion[${index}].format`}
									defaultValue={''}
									label='Format'
									disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2} >
								<IconButton
									id="delete"
									name="delete"
									disabled={props.edit ? false: true}
									onClick={() =>
										props.remove(index)
										}
								>
									<ClearIcon/>
								</IconButton>
							</Grid>
						</Grid>
						))
				}

					<Grid item container spacing={2} style={{marginTop: 6}}
						alignItems="center" justify="center">
						<Grid item xs={12}>
							<IconButton
								id="add_version"
								name="add_version"
								disabled={props.edit ? false: true}
								onClick={() =>
									props.append(props.emptyRow)
									}
							>Click to add version
								<AddCircleIcon/>
							</IconButton>
						</Grid>
					</Grid>
		</Grid>
	)
	
}

export default VersionFields
