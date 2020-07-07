import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function VersionForm() {

	// THIS DOESN'T WORK WITH REACT-HOOK-FORM, too buggy, use react-table instead
	const { id } = useParams()

	const temp = {artist: {},
								version: [ {upc: '123123'},
														{upc: 'aa23'} ]
								}


	const [version, setVersion] = useState()

	const { register, setValue, control, reset, handleSubmit } = useForm()
	
	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setVersion(json))
	}, [])

	
	const { fields, append, remove } = useFieldArray(
		{ control,
			name: 'version'
		}
		)
	function onSubmit(data) {
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
		{ fields.map((version, index) => (
			<div name='child' key={index}>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].upc`}
				defaultValue={`${version.index}`}
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
				onClick={() => remove(index)}
			>Delete
			</Button>
			</div>
			)
		)}
				<Button
					variant="contained"
					color="primary"
					id="submit"
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

						append({ upc: '',
										version_number: '',
										version_name: '',
										format: ''})
					}
					}

				>Add Version
				</Button>
		</form>
		</div>
	)
}

export default VersionForm

