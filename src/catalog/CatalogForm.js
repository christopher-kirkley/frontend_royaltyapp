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

import CatalogFields from './CatalogFields'
import VersionFields from './VersionFields'
import TrackFields from './TrackFields'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function CatalogForm(props) {

	const classes = useStyles()

	const [catalog, setCatalog ] = useState('')

	const [artistId, setArtistId] = useState('1')

	const [version, setVersion] = useState([])

	const [tracks, setTracks] = useState([])

	const [numberOfTracks, setNumberOfTracks] = useState(0)

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => (
				setCatalog(json),
				getTracks(json),
				json['version'].sort((a, b) => a.id - b.id),
				setVersion(json['version'])
			))
	}}, [])

	function getTracks(json) {
			json['tracks'].sort((a, b) => a.track_number - b.track_number);
			setTracks(json['tracks']);
			setNumberOfTracks(json['tracks'].length)
	}

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

	// const [artists, setArtists] = useState([])

	// useEffect(() => { 
	// 	fetch('http://localhost:5000/artists')
	// 	.then(res => res.json())
	// 	.then(json => {
	// 		const sorted = [...json].sort(function(a, b){
	// 			if(a.artist_name < b.artist_name) {return -1;}
	// 			if(a.artist_name > b.artist_name) {return 1;}
	// 		})
	// 		console.log(sorted)
	// 		setArtists(sorted)
	// 	})
	// 	.then(res => {
	// 		const artistChoices = artists.map((artist, i) =>
	// 			<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	// )
	// 	})
	// }, [])


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
					<Typography variant="h6" color="textSecondary" align="center">Catalog Info</Typography>
					<CatalogFields
						setValue={setValue}
						control={control}
						edit={props.edit}/>
					</Paper>
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
	{/*----------- Tracks ---------- */}
			<Grid item xs={12}>
				<Paper elevation={3} className={classes.paper}>
				<Grid container justify="space-between">
					<Grid item xs={1} >
						<Typography color="textSecondary" component="h6" variant="caption" align="center">TRACKS</Typography>
					</Grid>
					<TrackFields
						emptyTrackRow={emptyTrackRow}
						setValue={setValue}
						setTracks={setTracks}
						tracks={tracks}
						control={control}
						edit={props.edit}
						append={append}
						numberOfTracks={numberOfTracks}
						remove={remove}
					/>
					</Grid>
				</Paper>
			</Grid>
			</Grid>
		</form>
		</React.Fragment>
	)
}

export default CatalogForm
