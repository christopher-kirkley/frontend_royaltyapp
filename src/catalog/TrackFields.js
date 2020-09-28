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

function TrackFields(props) {

	const classes = useStyles()

	const [catalog, setCatalog ] = useState('')

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
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
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	const artistChoices = artists.map((artist, i) =>
		<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	)

	const { register, setValue, control, reset, handleSubmit } = useForm()

	const { fields, append, remove } = useFieldArray(
				{ 
					control: props.control,
					name: 'track',
					name: 'newTrack'
						}
				)

	function removeTracks(index) {
		const cloneTracks = [...props.tracks]
		cloneTracks.splice(index, 1) 
		props.setTracks(cloneTracks)
	}

	return (
		<Grid container style={{marginTop: 5}}> 

		{ 
			props.tracks.map((track, index) => (
			<Grid item container spacing={2} style={{marginBottom: 2}} alignItems="center" justify="center">
				<Controller
					type="hidden"
					as={TextField}
					control={props.control}
					name={`track[${index}].id`}
					defaultValue={`${track.id}`}
				/>
			<Grid item xs={2}>
				<Controller
					as={TextField}
					control={props.control}
					name={`track[${index}].track_number`}
					defaultValue={`${track.track_number}`}
					label='Track Number'
					disabled={props.edit ? false: true}
				/>
			</Grid>
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={props.control}
					name={`track[${index}].isrc`}
					defaultValue={`${track.isrc}`}
					variant="outlined"
					label='ISRC'
					disabled={props.edit ? false: true}
				/>
			</Grid>
			<Grid item xs={2}>
				<FormControl variant="outlined">
				<InputLabel shrink>Artist</InputLabel>
				<Controller
					as={<NativeSelect>
							{artistChoices}
							</NativeSelect>
							}
					name={`track[${index}].artist_id`}
					defaultValue={`${track.artist_id}`}
					control={props.control}
					disabled={props.edit ? false: true}
				/>
				</FormControl>
			</Grid>
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={props.control}
					name={`track[${index}].track_name`}
					defaultValue={`${track.track_name}`}
					variant="outlined"
					label='Track Name'
					disabled={props.edit ? false: true}
				/>
			</Grid>
			<Grid item xs={2} align="center">
				<IconButton
					id="delete"
					name="delete"
					onClick={() =>
						removeTracks(index)
						}
				>
					<ClearIcon/>
				</IconButton>
			</Grid>
		</Grid>
		))
		}


		{ 
			fields.map((newTrack, index) => (
			<Grid item container spacing={2} style={{marginBottom: 2}} alignItems="center" justify="center" key={newTrack.id}>
				<Grid item xs={2}>
					<Controller
						as={TextField}
						control={props.control}
						id={`newTrack[${index}].track_number`}
						name={`newTrack[${index}].track_number`}
						label='Track Number'
					/>
				</Grid>
				<Grid item xs={3}>
					<Controller
						as={TextField}
						control={props.control}
						name={`newTrack[${index}].isrc`}
						defaultValue={`${newTrack.isrc}`}
						label='ISRC'
					/>
				</Grid>
				<Grid item xs={2}>
					<FormControl variant="outlined">
					<InputLabel shrink>Artist</InputLabel>
					<Controller
					as={
						<NativeSelect>
							{artistChoices}
						</NativeSelect>
					}
						name={`newTrack[${index}].artist_id`}
						defaultValue={`${newTrack.artist_id}`}
						control={props.control}
					/>
					</FormControl>
				</Grid>
				<Grid Item xs={3}>
					<Controller
						as={TextField}
						control={props.control}
						name={`newTrack[${index}].track_name`}
						defaultValue={`${newTrack.track_name}`}
						label='Track Name'
					/>
				</Grid>
				<Grid item xs={2}>
								<IconButton
									id="delete"
									name="delete"
									disabled={props.edit ? false: true}
									onClick={() =>
										remove(index)
										}
								>
									<ClearIcon/>
								</IconButton>
				</Grid>
			</Grid>
			)
		)
		}



					<Grid item container spacing={2} style={{marginTop: 6}}
						alignItems="center" justify="center">
						<Grid item xs={12}>
							<IconButton
								id="add_track"
								name="add_track"
								disabled={props.edit ? false: true}
								onClick={() =>
									append(props.emptyTrackRow)
									}
							>Click to add track
								<AddCircleIcon/>
							</IconButton>
						</Grid>
					</Grid>
		</Grid>
	)
	
}

export default TrackFields
