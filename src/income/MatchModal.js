import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
		paper: {
					position: 'absolute',
					width: 400,
					height: 400,
					backgroundColor: theme.palette.background.paper,
					border: '2px solid #000',
					boxShadow: theme.shadows[5],
					padding: theme.spacing(2, 4, 3),
				},
	selected: {
		backgroundColor: "yellow"
		}
}));


function MatchModal(props) {

	const { register, control, handleSubmit, watch } = useForm({
		defaultValues: {
			column: [{ column: 'upc_id'}]
		}
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'column'
	})

	const classes = useStyles();

	const [upcs, setUpcs] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/version')
				.then(res => res.json())
				.then(json => setUpcs(json))
			}, [])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.version_number}
				</option>
			)
		})

	const columnChoices = props.columns.map((column) =>
		{
			return (
				<option
					id={column.accessor}
					value={column.accessor}
				>{column.Header}
				</option>
			)
		})

	const newUpc = ['choice1', 'choice2', 'choice3']

	const upcOptions = newUpc.map((value) =>
		{
			return (
				<option>{value}</option>
			)
		})

	const [ upc, setUpc ] = useState(false)

	const choice = watch("column")


	console.log(choice[0].column)

	const body = (
		<div style={{transform: "translate(100%, 20%)"}} className={classes.paper}>
		<Typography variant="h6" gutterBottom>Conditional Match</Typography>
			<Grid container justify="space-between" alignItems="center">
			{ fields.map((item, index) => {
			return (
				<React.Fragment>
					<Grid item xs={4}>
						<Controller
							as={<NativeSelect>
									{columnChoices}
									</NativeSelect>}
							control={control}
							id="column"
							name={`column[${index}].column`}
							defaultValue={`${item.column}`}
							/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="subtitle1">is</Typography>
					</Grid>
					<Grid item xs={4}>
					{ 
						choice[index].column === 'upc_id'
						?
						<NativeSelect
							id="value">
							{upcOptions}
						</NativeSelect>
						:
						choice[index].column === 'distributor'
						?
						<NativeSelect
							id="value">
							<option>no</option>
							<option>you</option>
						</NativeSelect>
						:
						choice[index].column === 'catalog_id'
						?
						<NativeSelect
							id="value">
							<option>cata</option>
							<option>you</option>
						</NativeSelect>
						:
						null
					}
					</Grid>
					<Grid item xs={1}>
						<IconButton>
						  <DeleteIcon />
						</IconButton>
					</Grid>
				</React.Fragment>
				)
				})}
				<Grid item xs={12}>
					<Button
						onClick={() => {
							append({ column: 'upc_id'})
						}}
						color="primary"
						size="small"
					>
					+ Add Condition
					</Button>
				</Grid>
			</Grid>
			<Divider style={{marginTop: 10, marginBottom: 10}}/>
			<Grid container justify="space-between">
				<Grid item xs={12}>
					<Typography variant="subtitle1" gutterBottom>Then assign</Typography>
				</Grid>
				<Grid item xs={5}>
					<NativeSelect
						id="new_upc">
						<option>Version Number</option>
					</NativeSelect>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="subtitle1">=</Typography>
				</Grid>
				<Grid item xs={5}>
					<NativeSelect
						id="new_upc">
						{upcChoices}
					</NativeSelect>
				</Grid>
				<Grid container item style={{marginTop: 30}} justify="flex-end">
					<Grid item xs={3}>
						<Button
							variant="contained"
							color="secondary"
							size="small"
						>Cancel</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							color="primary"
							size="small"
						>Submit</Button>
					</Grid>
				</Grid>
			</Grid>
			</div>
			);
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
		>
		{body}
		</Modal>
	)
}

export default MatchModal

