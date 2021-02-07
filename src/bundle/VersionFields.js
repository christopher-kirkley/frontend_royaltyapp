import React, { useState, useEffect } from 'react'

import { useForm, Controller, defaultValue, useFieldArray } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
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

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function VersionFields(props) {

	const classes = useStyles()

	const [bundleVersions, setBundleVersions] = useState([])

	useEffect(() => { 
		fetch('http://localhost:5000/version')
		.then(res => res.json())
		.then(json => {setBundleVersions(json)
		})
	}, [])

	const versionChoices = bundleVersions.map((version, i) =>
		<option id={version.id} value={version.id}>{version.version_number}</option>
	)

	function removeVersion(index) {
		const cloneVersion = [...props.bundleVersion]
		cloneVersion.splice(index, 1) 
		props.setBundleVersion(cloneVersion)
	}

	return (
		<Grid container style={{marginTop: 5}}>

				{
					props.bundleVersion.map((version, index) => (
						<Grid item container spacing={2} alignItems="center" key={version.id}>
								<Controller
									type="hidden"
									as={TextField}
									control={props.control}
									name={`bundleVersion[${index}].version_id`}
									defaultValue={`${version.id}`}
									disabled={props.edit ? false: true}
								/>
							<Grid item xs={6}>
								<Controller
									as={TextField}
									control={props.control}
									name={`bundleVersion[${index}].version_number`}
									defaultValue={`${version.version_number}`}
									label='Version Number'
										disabled={props.edit ? false: true}
								/>
							</Grid>
							<Grid item xs={2} align="center">
								<IconButton
									id="delete"
									name="delete"
									disabled={props.edit ? false: true}
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
					props.fields.map((newBundleVersion, index) => (
						<Grid item container spacing={2} alignItems="center" justify="center" key={newBundleVersion.id}>
							<Controller
								type="hidden"
								as={TextField}
								control={props.control}
								name={`newBundleVersion[${index}].id`}
							/>
							<Grid item xs={6}>
								<FormControl variant="outlined">
								<InputLabel shrink>Version Number</InputLabel>
								<Controller
								as={
									<NativeSelect>
										{versionChoices}
									</NativeSelect>
								}
									name={`newBundleVersion[${index}].version_id`}
									defaultValue='1'
									control={props.control}
								/>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<Controller
									as={TextField}
									control={props.control}
									name={`newBundleVersion[${index}].percent`}
									defaultValue={''}
									label='Percent'
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
