import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'

function TrackForm() {

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
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then((json) => 
			 {
				 getTracks(json)
		})

	}, [])

	const { fields, append, remove } = useFieldArray(
		{ control,
			name: 'track'
		}
		)

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
		console.log(data)
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
		<div>
		<form>
		{ tracks.map((track, index) => (
			<div name='child' key={index}>
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`tracks[${index}].id`}
				defaultValue={`${track.id}`}
			/>
			<Controller
				as={TextField}
				control={control}
				name={`tracks[${index}].track_number`}
				defaultValue={`${track.track_number}`}
				label='Track Number'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`tracks[${index}].isrc`}
				defaultValue={`${track.isrc}`}
				label='ISRC'
			/>
				<Controller
				as={
					<select>
						{artistChoices}
					</select>
				}
					name={`tracks[${index}].artist_id`}
					defaultValue={`${track.artist_id}`}
					control={control}
				/>
			<Controller
				as={TextField}
				control={control}
				name={`tracks[${index}].track_name`}
				defaultValue={`${track.track_name}`}
				label='Track Name'
			/>
			</div>
		))}
		</form>

		<form onSubmit={handleSubmit(onSubmit)}>
		{ fields.map((addTrack, index) => (
			<div name='child' key={index}>
			<Grid container xs={12} spacing={2}>
				<Grid item xs={2}>
				<Controller
					as={TextField}
					control={control}
					id={`addTrack[${index}].track_number`}
					name={`addTrack[${index}].track_number`}
					defaultValue={`${index + numberOfTracks + 1}`}
					label='Track Number'
				/>
				</Grid>
				<Grid item>
				<Controller
					as={TextField}
					control={control}
					name={`addTrack[${index}].isrc`}
					defaultValue={`${addTrack.isrc}`}
					label='ISRC'
				/>
				</Grid>
				<Grid item xs={3}>
				<Controller
				as={
					<select>
						{artistChoices}
					</select>
				}
					name={`addTrack[${index}].artist_id`}
					defaultValue={`${addTrack.artist_id}`}
					control={control}
				/>
				</Grid>
				<Grid Item xs={2}>
				<Controller
					as={TextField}
					control={control}
					name={`addTrack[${index}].track_name`}
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
				>Delete
				</Button>
				</Grid>
			</Grid>
			</div>
			)
		)}
				<Button
					variant="contained"
					color="primary"
					id="track_submit"
					name="submit"
					type="submit"
				>Submit
				</Button>
				<Button
					variant="contained"
					color="primary"
					id="add_track"
					name="add_track"
					onClick={() =>
						append(emptyRow)
					}

				>Add Track
				</Button>
		</form>
		</div>
		
	)
}

export default TrackForm
