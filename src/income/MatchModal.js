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
			column: [{ column: 'upc_id', value: 'none'}]
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

	const tracks = []

	const trackChoices = tracks.map((track) =>
		{
			return (
				<option></option>
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

	const [ upc, setUpc ] = useState(false)

	const choice = watch("column")

	function makeOptions(id) {
		const u = new Set(props.data.map((row) => {
			if (id === 'upc_id')
			{return row.upc_id}
			if (id === 'catalog_id')
			{return row.catalog_id}
			if (id === 'type')
			{return row.type}
			if (id === 'medium')
			{return row.medium}
			if (id === 'description')
			{return row.description}
			if (id === 'distributor')
			{return row.distributor}
		}))

		let array = [...u]

		const options = array.map((value) =>
			{
				return (
					<option
						id={value}
						value={value}
					>{value}
					</option>
				)
			})

		return options
	}

	function onSubmit(data) {
		console.log(data)
	}

	const assign = watch("new")

	function test(item, index) {
		if (choice && choice[index])
		{
			const column = choice[index].column
			return(
						<Controller
							as={<NativeSelect>
										<option id="none" value="none">None</option>
										{makeOptions(column)}
									</NativeSelect>}
							control={control}
							id={column}
							name={column}
							defaultValue='none'
							/>
	)
	}
	}

	const body = (
		<div style={{transform: "translate(100%, 20%)"}} className={classes.paper}>
		<Typography variant="h6" gutterBottom>Conditional Match</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container justify="space-between" alignItems="center">
			{ fields.map((item, index) => {
			return (
				<React.Fragment key={index}>
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
						{test(item, index)}
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
					<Controller
						as={<NativeSelect>
									<option id="version_number" value="version_number">Version Number</option>
									<option id="track_title" value="track_title">Track Title</option>
								</NativeSelect>}
						control={control}
						defaultValue="version_number"
						id="new"
						name="new"
						/>
				</Grid>
				<Grid item xs={2}>
					<Typography variant="subtitle1">=</Typography>
				</Grid>
				<Grid item xs={5}>
					<Controller
						as={<NativeSelect
								id="new_value">
								<option id="none" value="none">None</option>
								{ assign === 'track_title'
									?
									trackChoices
									:
									upcChoices
								}
								</NativeSelect>
						}
						control={control}
						defaultValue="none"
						id="new_value"
						name="new_value"
					/>
				</Grid>
				<Grid container item style={{marginTop: 30}} justify="flex-end">
					<Grid item xs={3}>
						<Button
							variant="outlined"
							color="secondary"
							size="small"
							onClick={props.handleMatchClose}
						>Cancel</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							variant="contained"
							color="primary"
							size="small"
							type="submit"
						>Submit</Button>
					</Grid>
				</Grid>
			</Grid>
			</form>
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

