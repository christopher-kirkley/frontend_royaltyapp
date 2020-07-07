import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function NewVersionForm(props) {

	const { id } = useParams()

	const { register, setValue, control, reset, handleSubmit } = useForm()

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
		.then(res => props.onChange())
		.then(res => {reset({upc: ''})})
		
	}

	
	return (
		<div>
		<form onSubmit={handleSubmit(onSubmit)}>
		{ fields.map((version, index) => (
			<div name='child' key={index}>
			<Controller
				type="hidden"
				as={TextField}
				control={control}
				name={`version[${index}].id`}
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].upc`}
				label='UPC'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].version_number`}
				label='Version Number'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].version_name`}
				label='Version Name'
			/>
			<Controller
				as={TextField}
				control={control}
				name={`version[${index}].format`}
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

export default NewVersionForm
