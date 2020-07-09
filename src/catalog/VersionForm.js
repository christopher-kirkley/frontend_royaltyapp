import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function VersionForm(props) {

	let id = props.id
	
	const { register, setValue, control, reset, handleSubmit } = useForm()

	const emptyRow = {format: '',
										catalog_id: '',
										id: '',
										upc: '',
										version_name: '',
										version_number: ''}
	
	const [version, setVersion] = useState([])

	const [length, setLength] = useState(0)

	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setVersion(json['version']))
	}, [])

	// useEffect(() => { 
	// 	fetch(`http://localhost:5000/catalog/${id}`)
	// 	.then(res => res.json())
	// 	.then(json => setVersion(json['version']))
	// }, [version])
	
	const { fields, append, remove } = useFieldArray(
		{ control,
			name: 'version'
		}
		)

	function onSubmit(data) {
		console.log(data)
		const json_res = JSON.stringify(data)
		fetch('http://localhost:5000/version', {
			method: 'POST',
			body: JSON.stringify(
				{'catalog': id,
				'version': data['addVersion']})
		})
		.then(res => res.json())
		.then(res => fetch(`http://localhost:5000/catalog/${id}`))
		.then(res => res.json())
		.then(json => setVersion(json['version']))
		.then(res => reset(version))
		// need to post new data here, after waiting for data to update
		// currently have to reload the form to see changes which is bullshit
		
	}
		

	
	return (
		<div>
		<form onSubmit={handleSubmit(onSubmit)}>
		{ version.map((version, index) => (
			<div name='child' key={index}>
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`version[${index}].id`}
				defaultValue={`${version.id}`}
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].upc`}
				defaultValue={`${version.upc}`}
				label='UPC'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].version_number`}
				defaultValue={`${version.version_number}`}
				label='Version Number'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].version_name`}
				defaultValue={`${version.version_name}`}
				label='Version Name'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].format`}
				defaultValue={`${version.format}`}
				label='Format'
			/>
			<Button
				variant="contained"
				color="secondary"
				id="add_version"
				name="add_version"
			>Delete
			</Button>
			</div>
			)
		)}
		</form>
		<form onSubmit={handleSubmit(onSubmit)}>
		{ fields.map((addVersion, index) => (
			<div name='child' key={index}>
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`addVersion[${index}].id`}
				defaultValue={`${addVersion.id}`}
			/>
			<Controller
				as={TextField}
				control={control}
				name={`addVersion[${index}].upc`}
				defaultValue={`${addVersion.upc}`}
				label='UPC'
			/>
			<Controller
				as={TextField}
				control={control}
				id={`addVersion[${index}].version_number`}
				name={`addVersion[${index}].version_number`}
				defaultValue={`${addVersion.version_number}`}
				label='Version Number'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`addVersion[${index}].version_name`}
				defaultValue={`${addVersion.version_name}`}
				label='Version Name'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`addVersion[${index}].format`}
				defaultValue={`${addVersion.format}`}
				label='Format'
			/>
			<Button
				variant="contained"
				color="secondary"
				id="add_version"
				name="add_version"
			>Delete
			</Button>
			</div>
			)
		)}
				<Button
					variant="contained"
					color="primary"
					id="version_submit"
					name="submit"
					type="submit"
				>Submit
				</Button>
				<Button
					variant="contained"
					color="primary"
					id="add_version"
					name="add_version"
					onClick={() =>
						append(emptyRow)
					}

				>Add Version
				</Button>
		</form>
		
		</div>
	)
}

export default VersionForm

