import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'

function TrackForm() {

	const data= {}

	const { id } = useParams()

	const { register, setValue, control, reset, handleSubmit } = useForm()
	
	const [track, setTrack] = useState([])
	
	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then((json) => 
		console.log(json)
		)

			// {
			// 
			// json['track'].sort((a, b) => a.id - b.id);
			// setTrack(json['track'])})
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
				'track': data['track']})
		})
		.then(res => res.json())
		.then(res => fetch(`http://localhost:5000/catalog/${id}`))
		.then(res => res.json())
		.then((json) => {
			json['track'].sort((a, b) => a.id - b.id);
			setTrack(json['track'])
		})
		.then(res => reset(track))
	}

	function addTrack(data) {
		fetch('http://localhost:5000/track', {
			method: 'POST',
			body: JSON.stringify(
				{'catalog': id,
				'track': data['addTrack']})
		})
		// .then(res => res.json())
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
										track_name: ''}

	return (
		<div>
		<form>
		{ track.map((track, index) => (
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`track[${index}].id`}
				defaultValue={`${track.id}`}
			/>
		))}
		</form>

		<form onSubmit={handleSubmit(onSubmit)}>
		{ fields.map((addTrack, index) => (
			<div name='child' key={index}>
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`addTrack[${index}].id`}
				defaultValue={`${addTrack.id}`}
			/>
			<Controller
				as={TextField}
				control={control}
				id={`addTrack[${index}].track_number`}
				name={`addTrack[${index}].track_number`}
				defaultValue={`${index+1}`}
				label='Track Number'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`addTrack[${index}].track_name`}
				defaultValue={`${addTrack.track_name}`}
				label='Track Name'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`addTrack[${index}].isrc`}
				defaultValue={`${addTrack.isrc}`}
				label='ISRC'
			/>
			<Button
				variant="contained"
				color="secondary"
				id="delete_track"
				name="delete_track"
			>Delete
			</Button>
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
