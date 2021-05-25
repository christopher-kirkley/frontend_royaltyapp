import React, { useState, useEffect, useContext } from 'react'

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

import { makeStyles } from '@material-ui/core/styles'

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';
import { service } from '../_services/services';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	modal: {
		position: "absolute",
		width: 900,
		backgroundColor: "white",
		border: '2px solid #000',
		boxShadow: theme.shadows[5],

	}
}))

function BundleFields(props) {

	const classes = useStyles()

	const { artistsContext } = useContext(Context)

	const [bundle, setBundle ] = useState('')

	const [artists, setArtists] = artistsContext

	useEffect(() => { 
		if (props.id) {
			service.getAll(`bundle/${props.id}`)
			.then(json => setBundle(json))
	}}, [])

	useEffect(() => {
		// const artist_name = bundle && catalog.artist ? catalog.artist.artist_name : null;
		// const artist_id = bundle && catalog.artist ? catalog.artist.id : 1;
		
		props.setValue([
			{bundle_number: bundle.bundle_number},
			{bundle_name: bundle.bundle_name},
			{upc: bundle.upc},
		])
	}, [bundle])
	
	const artistChoices = artists.map((artist, i) =>
		<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	)

	return (
		<Grid container spacing={1} alignItems="center" justify="center">
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={props.control}
					name="bundle_number"
					required
					fullWidth
					label="Bundle Number"
					id="bundle_number"
					autoComplete="bundle number"
					autoFocus
					defaultValue=""
					disabled={props.edit ? false: true}
				/>
			</Grid>
			<Grid item xs={4}>
				<Controller
					as={TextField}
					control={props.control}
					name="bundle_name"
					required
					fullWidth
					label="Title"
					id="bundle_name"
					autoComplete="bundle name"
					autoFocus
					defaultValue=""
					disabled={props.edit ? false: true}
				/>
			</Grid>
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={props.control}
					name="upc"
					required
					fullWidth
					label="UPC"
					id="upc"
					autoComplete="bundle upc"
					autoFocus
					defaultValue=""
					disabled={props.edit ? false: true}
				/>
			</Grid>
		</Grid>
	)
	
}

export default BundleFields
