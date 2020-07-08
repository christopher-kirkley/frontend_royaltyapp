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
	const [number, setNumber] = useState(0)

	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setVersion(json['version']))
	}, [])

	
	// const { fields, append, remove } = useFieldArray(
	// 	{ control,
	// 		name: 'version'
	// 	}
	// 	)

	function onSubmit(data) {
		console.log(data)
		const json_res = JSON.stringify(data)
		fetch('http://localhost:5000/version', {
			method: 'POST',
			body: JSON.stringify(
				{'catalog': id,
				'version': data['version']})
		})
		.then(res => res.json())
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
						{
							console.log(version)
							const newVersion = [...version]
							newVersion.push(emptyRow)
							setVersion(newVersion)
							
							
					}
					}

				>Add Version
				</Button>
		</form>
		
		</div>
	)
}

export default VersionForm
