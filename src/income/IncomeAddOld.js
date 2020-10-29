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
								<Grid item xs={3} >
									<Typography color="textSecondary" component="h6" variant="caption" align="left">NEW INCOME STATEMENT</Typography>
								</Grid>
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
							</Grid>
			
			<Divider style={{marginTop: 20, marginBottom: 20}}/>

		{ 
			fields.map((newTrack, index) => (
			<Grid item container spacing={2} style={{marginBottom: 2}} alignItems="center" justify="center" key={newTrack.id}>
				<Grid item xs={2}>
					<Controller
						control={control}
						id={`newTrack[${index}].date`}
						name={`newTrack[${index}].date`}
						label='Date'
						as={TextField}
						defaultValue={`${index + numberOfTracks + 1}`}
					/>
				</Grid>
				<Grid item xs={3}>
					<Controller
						as={TextField}
						control={control}
						name={`newTrack[${index}].amount`}
						defaultValue={`${newTrack.amount}`}
						label='Amount'
					/>
				</Grid>
				<Grid Item xs={3}>
					<Controller
						as={
							<React.Fragment>
							<FormControl component="fieldset">
							  <RadioGroup aria-label="gender" name="gender1" value={radio} onChange={handleChange}>
							    <FormControlLabel value="female" control={<Radio />} label="Version" />
							    <FormControlLabel value="male" control={<Radio />} label="Track" />
							  </RadioGroup>
							</FormControl>
							</React.Fragment>
						}
						control={control}
						name={`newTrack[${index}].track_name`}
						defaultValue={`${newTrack.track_name}`}
						label='Track Name'
					/>
				</Grid>
				<Grid item xs={2}>
					<Controller
					as={
						<NativeSelect>
						</NativeSelect>
					}
						name={`newTrack[${index}].artist_id`}
						defaultValue={`${newTrack.artist_id}`}
						control={control}
					/>
				</Grid>
				<Grid item xs={2}>
								<IconButton
									id="delete"
									name="delete"
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

							</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default IncomeAdd;
