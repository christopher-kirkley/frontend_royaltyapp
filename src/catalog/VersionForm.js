import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ConditionalButton from '../components/ConditionalButton'

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
					if (id) {
									fetch(`http://localhost:5000/catalog/${id}`)
									.then(res => res.json())
									.then((json) => {
														json['version'].sort((a, b) => a.id - b.id);
														setVersion(json['version'])})
								}
				}, [])

		const { fields, append, remove } = useFieldArray(
					{ control,
									name: 'version'
								}
					)


		// function addVersion(data) {
		// 			fetch('http://localhost:5000/version', {
		// 							method: 'POST',
		// 							body: JSON.stringify(
		// 												{'catalog': id,
		// 																	'version': data['addVersion']})
		// 						})
		// 			.then(res => res.json())
		// 			.then(res => fetch(`http://localhost:5000/catalog/${id}`))
		// 			.then(res => res.json())
		// 			.then(json => setVersion(json['version']))
		// 			.then(res => reset(version))
		// 		}

		// function onSubmit(data) {
		// 			data['addVersion'] ? addVersion(data) : updateVersion(data)
		// 		}
			

		return (
					<React.Fragment>
					<form onSubmit={handleSubmit(props.onSubmit)} id="form">

					{fields.length == 0 && version.length == 0 ? <Typography variant="h6" align="center">No data</Typography> : <p></p>}
					
					<Grid container style={{marginTop: 5}}>

					{ version.map((version, index) => (
								<Grid item container spacing={2} alignItems="center">
										<Controller
											type="hidden"
											as={TextField}
											control={control}
											name={`version[${index}].id`}
											defaultValue={`${version.id}`}
												disabled={props.edit ? false: true}
										/>
									<Grid item xs={3}>
										<Controller
											as={TextField}
											control={control}
											name={`version[${index}].upc`}
											defaultValue={`${version.upc}`}
											label='UPC'
												disabled={props.edit ? false: true}
										/>
									</Grid>
									<Grid item xs={2}>
										<Controller
											as={TextField}
											control={control}
											name={`version[${index}].version_number`}
											defaultValue={`${version.version_number}`}
											label='Version Number'
												disabled={props.edit ? false: true}
										/>
									</Grid>
									<Grid item xs={3}>
										<Controller
											as={TextField}
											control={control}
											name={`version[${index}].version_name`}
											defaultValue={`${version.version_name}`}
											label='Version Name'
												disabled={props.edit ? false: true}
										/>
									</Grid>
									<Grid item xs={2}>
										<Controller
											as={TextField}
											control={control}
											name={`version[${index}].format`}
											defaultValue={`${version.format}`}
											label='Format'
												disabled={props.edit ? false: true}
										/>
									</Grid>
									<Grid item xs={2} align="center">
										<Button
											variant="contained"
											color="secondary"
											id="delete_version"
											name="delete_version"
											fullWidth
												disabled={props.edit ? false: true}
										>Delete
										</Button>
									</Grid>
								</Grid>
								)
								)}

					{ fields.map((addVersion, index) => (
									<Grid item container spacing={2} alignItems="center" justify="center">
										<Controller
											type="hidden"
											as={TextField}
											control={control}
											name={`addVersion[${index}].id`}
											defaultValue={`${addVersion.id}`}
										/>
										<Grid item xs={3}>
											<Controller
												as={TextField}
												control={control}
												name={`addVersion[${index}].upc`}
												defaultValue={`${addVersion.upc}`}
												label='UPC'
											/>
										</Grid>
										<Grid item xs={2}>
											<Controller
												as={TextField}
												control={control}
												id={`addVersion[${index}].version_number`}
												name={`addVersion[${index}].version_number`}
												defaultValue={`${addVersion.version_number}`}
												label='Version Number'
											/>
										</Grid>
										<Grid item xs={3}>
											<Controller
												as={TextField}
												control={control}
												name={`addVersion[${index}].version_name`}
												defaultValue={`${addVersion.version_name}`}
												label='Version Number'
											/>
										</Grid>
										<Grid item xs={2}>
											<Controller
												as={TextField}
												control={control}
												name={`addVersion[${index}].format`}
												defaultValue={`${addVersion.format}`}
												label='Format'
											/>
										</Grid>
										<Grid item xs={2} >
											<Button
												variant="contained"
												fullWidth
												color="secondary"
												id="delete"
												name="delete"
											>Delete
											</Button>
										</Grid>
									</Grid>
									)
								)}

					<Grid item container spacing={2} style={{marginTop: 6}} alignItems="left">
						<Grid item xs={1}>
							<Button
								variant="contained"
								color="primary"
								id="add_version"
								fullWidth	
								name="add_version"
								onClick={() =>
															append(emptyRow)
														}
									disabled={props.edit ? false: true}
							>+
							</Button>
						</Grid>
					</Grid>
					</Grid>

					</form>
					</React.Fragment>

					
				)
}

export default VersionForm
