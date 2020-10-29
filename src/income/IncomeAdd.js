import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import NativeSelect from '@material-ui/core/NativeSelect'
import Divider from '@material-ui/core/Divider'
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';

import DateFnsUtils from '@date-io/date-fns';
import {
	  MuiPickersUtilsProvider,
	  KeyboardTimePicker,
	  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useForm, Controller, useFieldArray } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))


function IncomeAdd() {

	const emptyRow = {
		amount: '',
		version: '',
		select: ''
	}

	const classes = useStyles()

	const { handleSubmit, control, setValue } = useForm({
		defaultValues: {
			newTrack: [{ date: "", amount: "" }]
		}
	})

	const { fields, append, remove } = useFieldArray(
				{ 
					control,
					name: 'newTrack'
						}
				)

	const history = useHistory()

	const [ importedIncome, setImportedIncome ] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/income/imported-statements')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}, [])

	function getImportedIncome() {
		fetch('http://localhost:5000/income/imported-statements')
		.then(res => res.json())
		.then(json => setImportedIncome(json))
	}

	function handleImportCatalog() {
		history.push('/catalog/import')
	}

	function handleClick() {
		history.push('/catalog/add')
	}

	function handleImport() {
		history.push('/catalog/import')
	}


	function removeTracks(index) {
		// const cloneTracks = [...props.tracks]
		// cloneTracks.splice(index, 1) 
		// props.setTracks(cloneTracks)
	}

	const [radio, setRadio] = React.useState('a');

	const handleChange = (event) => {
				setRadio(event.target.value);
			};

	const [numberOfTracks, setNumberOfTracks] = useState(1)

		return (
			<Container>
				<Header name='New Income Statement'/>

				<Grid container direction="row" >
					<Grid item xs={12}>

						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid container alignItems="center">
									<Grid xs={2}>
									<Typography variant="subtitle1">Statement Name</Typography>
									</Grid>
									<Grid xs={2}>
										<Controller
											as={TextField}
											name="statement_name"
											id="statement_name"
											defaultValue=""
											control={control}
										/>
									</Grid>
								</Grid>
								<Grid item xs={12}>
			<Divider style={{marginTop: 20, marginBottom: 20}}/>

									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Date</TableCell>
												<TableCell>Amount</TableCell>
												<TableCell>Version/Track</TableCell>
												<TableCell>Select</TableCell>
												<TableCell>
													<Button
														onClick={() => append(emptyRow)}
													>
													Add
													</Button>
												</TableCell>
											</TableRow>

		{ 
			fields.map((newTrack, index) => (
			<TableRow key={newTrack.id}>
				<TableCell>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Controller
						control={control}
						id={`newTrack[${index}].date`}
						name={`newTrack[${index}].date`}
						label='Date'
									as={
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yy"
											KeyboardButtonProps={{
																		'aria-label': 'change date',
																		}}
										/>
									}
						defaultValue={new Date()}
					/>
				</MuiPickersUtilsProvider>
				</TableCell>
				<TableCell item xs={3}>
					<Controller
						as={TextField}
						control={control}
						name={`newTrack[${index}].amount`}
						defaultValue={`${newTrack.amount}`}
						label='Amount'
					/>
				</TableCell>
				<TableCell Item xs={3}>
				</TableCell>
				<TableCell item xs={2}>
					<Controller
					as={
						<NativeSelect>
						</NativeSelect>
					}
						name={`newTrack[${index}].artist_id`}
						defaultValue={`${newTrack.artist_id}`}
						control={control}
					/>
				</TableCell>
				<TableCell item xs={2}>
								<IconButton
									id="delete"
									name="delete"
									onClick={() =>
										remove(index)
										}
								>
									<ClearIcon/>
								</IconButton>
				</TableCell>
			</TableRow>
			)
		)
		}

										</TableHead>
									</Table>


								</Grid>
								<Grid container alignItems="center" justify="flex-end">
									<Grid item>
										<Button
											id="submit"
											type="submit"
											variant="contained"
											color="primary"
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			



			</Container>
		)
	}




export default IncomeAdd;
