import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import ConditionalButton from '../components/ConditionalButton'

function TrackForm() {

	const fields = []
	const [edit, setEdit] = useState(false)

	function handleClick() {
		setEdit(!edit)
	}

	const data = {}

	const { id } = useParams()

	const { register, setValue, control, reset, handleSubmit } = useForm()
	
	const [tracks, setTracks] = useState([])

	const [numberOfTracks, setNumberOfTracks] = useState(0)
	
	const [artists, setArtists] = useState([])
	
	useEffect(() => { 
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => setArtists(json))
	}, [])

	const artistChoices = artists.map((artist, index) =>
		<option key={index} value={artist.id}>{artist.artist_name}</option>
	)

	function getTracks(json) {
			json['tracks'].sort((a, b) => a.track_number - b.track_number);
			setTracks(json['tracks']);
			setNumberOfTracks(json['tracks'].length)
	}

	useEffect(() => { 
		if (id) {
			fetch(`http://localhost:5000/catalog/${id}`)
			.then(res => res.json())
			.then((json) => 
				 {
					 getTracks(json)
			})
		}
	}, [])

	function updateTrack(data) {
		fetch('http://localhost:5000/track', {
			method: 'PUT',
			body: JSON.stringify(
				{'catalog': id,
				'tracks': data['tracks']
		})}
		)
		.then(res => res.json())
		.then(res => fetch(`http://localhost:5000/catalog/${id}`))
		.then(res => res.json())
		.then((json) => {
			json['tracks'].sort((a, b) => a.id - b.id);
			setTracks(json['tracks'])
		})
		.then(res => reset(tracks))
	}

	function addTrack(data) {
		fetch('http://localhost:5000/track', {
			method: 'POST',
			body: JSON.stringify(
				{'catalog': id,
				'track': data['addTrack']})
		})
		// .then(res => fetch(`http://localhost:5000/catalog/${id}`))
		// .then(res => res.json())
		// .then(json => setTrack(json['track']))
		// .then(res => reset(track))
	}

	function onSubmit(data) {
		data['addTrack'] ? addTrack(data) : updateTrack(data)
	}
	
	const emptyRow = { track_number: '',
										isrc: '',
										artist_id: 1,
										track_name: ''}

	return (
		<React.Fragment>
		<form onSubmit={handleSubmit(onSubmit)} id="track-form">



		<Grid container style={{marginTop: 5}}> 
		{ 
			tracks.map((track, index) => (
			<Grid item container spacing={2} style={{marginBottom: 2}} alignItems="center" justify="center">
				<Controller
					type="hidden"
					as={TextField}
					control={control}
					name={`tracks[${index}].id`}
					defaultValue={`${track.id}`}
				/>
			<Grid item xs={2}>
				<Controller
					as={TextField}
					control={control}
					name={`tracks[${index}].track_number`}
					defaultValue={`${track.track_number}`}
					variant="outlined"
					label='Track Number'
						disabled={edit ? false: true}
				/>
			</Grid>
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={control}
					name={`tracks[${index}].isrc`}
					defaultValue={`${track.isrc}`}
					variant="outlined"
					label='ISRC'
						disabled={edit ? false: true}
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
					name={`tracks[${index}].artist_id`}
					defaultValue={`${track.artist_id}`}
					control={control}
						disabled={edit ? false: true}
				/>
				</FormControl>
			</Grid>
			<Grid item xs={3}>
				<Controller
					as={TextField}
					control={control}
					name={`tracks[${index}].track_name`}
					defaultValue={`${track.track_name}`}
					variant="outlined"
					label='Track Name'
						disabled={edit ? false: true}
				/>
			</Grid>
			<Grid item xs={2} align="center">
				<Button
					variant="contained"
					color="secondary"
					id="delete_version"
					name="delete_version"
					fullWidth
						disabled={edit ? false: true}
				>Delete
				</Button>
			</Grid>
		</Grid>
		))
		}

		{ 
			fields.map((addTrack, index) => (
			<Grid item container spacing={2} style={{marginBottom: 2}} alignItems="center" justify="center">
				<Grid item xs={2}>
					<Controller
						as={TextField}
						control={control}
						id={`addTrack[${index}].track_number`}
						name={`addTrack[${index}].track_number`}
						defaultValue={`${index + numberOfTracks + 1}`}
						variant="outlined"
						label='Track Number'
					/>
				</Grid>
				<Grid item xs={3}>
					<Controller
						as={TextField}
						control={control}
						name={`addTrack[${index}].isrc`}
						defaultValue={`${addTrack.isrc}`}
						variant="outlined"
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
						name={`addTrack[${index}].artist_id`}
						defaultValue={`${addTrack.artist_id}`}
						control={control}
					/>
					</FormControl>
				</Grid>
				<Grid Item xs={3}>
					<Controller
						as={TextField}
						control={control}
						name={`addTrack[${index}].track_name`}
						variant="outlined"
						defaultValue={`${addTrack.track_name}`}
						label='Track Name'
					/>
				</Grid>
				<Grid item xs={2}>
				<Button
					variant="contained"
					color="secondary"
					id="delete_track"
					name="delete_track"
					fullWidth
				>Delete
				</Button>
				</Grid>
			</Grid>
			)
		)
		}

			<Grid item container spacing={2} alignItems="center" justify="left">
			<Grid item xs={1}>
				<Button
					variant="contained"
					color="primary"
					id="add_track"
					fullWidth
					name="add_track"
						disabled={edit ? false: true}
				>+
				</Button>
			</Grid>
		</Grid>
		</Grid>
		</form>
		<Grid container justify="center">
				<Grid item xs={4} justify="center" style={{marginTop: 5}}>
					<ConditionalButton edit={edit} handleClick={handleClick}
						form={"track-form"}/>
				</Grid>
		</Grid>
		</React.Fragment>
		


		
	)
}

export default TrackForm
