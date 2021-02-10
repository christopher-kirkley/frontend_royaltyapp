import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
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
					backgroundColor: theme.palette.background.paper,
					padding: theme.spacing(5, 4, 5),
				},
	selected: {
		backgroundColor: "yellow"
		},
	list: {
		width: 400,
		padding: 20

	}
}));


function MatchModal(props) {

	const { register, control, handleSubmit, watch } =
			useForm({
				defaultValues: {
					column: 
					[
						{ column: 'isrc_id', value: 'none'},
					]
				}
			})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'column'
	})

	const classes = useStyles();

	const [upcs, setUpcs] = useState([])

	const [tracks, setTracks] = useState([])


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

	const [bundles, setBundles] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/bundle')
				.then(res => res.json())
				.then(json => setBundles(json))
			}, [])

	const bundleChoices = bundles.map((bundle) =>
		{
			return (
				<option
					id={bundle.bundle_number}
					value={bundle.upc}
				>{bundle.bundle_number}
				</option>
			)
		})

	useEffect(() => {
				fetch('http://localhost:5000/tracks')
				.then(res => res.json())
				.then(json => {
					const sorted = [...json].sort((a, b) => (a.isrc > b.isrc))
					setTracks(sorted)
				})
			}, [])

	const trackChoices = tracks.map((track) =>
		{
			return (
				<option
					id={track.isrc}
					value={track.isrc}
				>
				{track.isrc}
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

	const [ upc, setUpc ] = useState(false)

	const choice = watch("column")

	function makeOptions(id) {
		const u = new Set(props.data.map((row) => {
			if (id === 'upc_id')
			{return row.upc_id}
			if (id === 'isrc_id')
			{return row.isrc_id}
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
			if (id === 'album_name')
			{return row.album_name}
			if (id === 'track_name')
			{return row.track_name}
			if (id === 'version_number')
			{return row.version_number}
		}))

		let array = [...u].sort()

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

	const assign = watch("new")

	function test(item, index) {
		if (choice && choice[index])
		{
			const column = choice[index].column
			return(
						<Controller
							as={<NativeSelect
										id="column">
										<option disabled="true" value="none">Select...</option>
										{makeOptions(column)}
									</NativeSelect>}
							control={control}
							required={true}
							id={column}
							name={column}
							defaultValue='none'
							/>
	)
	}
	}


	return (
		<div className={classes.paper, classes.list}>
		<Typography variant="h6" gutterBottom>Conditional Match</Typography>
		<Typography variant="subtitle1" gutterBottom>Apply to transactions where</Typography>
			<form onSubmit={handleSubmit(props.onSubmit)}>
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
					<Grid item xs={1}>
						<Typography variant="subtitle1">is</Typography>
					</Grid>
					<Grid item xs={4}>
						{test(item, index)}
					</Grid>
					<Grid item xs={1}>
						<IconButton>
						  <DeleteIcon
								onClick={() => remove(index)}
							/>
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
					{ props.type === 'track' 
						?
						<Typography variant="subtitle1" gutterBottom>
						Then assign new ISRC
						</Typography>
						:
						<Typography variant="subtitle1" gutterBottom>
						Then assign new UPC
						</Typography>
					}
				</Grid>
				<Grid item xs={5}>
					<Controller
						as={<NativeSelect
								id="new_value">
								<option value="none" disabled="true">Select...</option>
								{ props.type === 'track'
									?
									trackChoices
									:
									upcChoices
									// bundleChoices
								}
								</NativeSelect>
						}
						control={control}
						defaultValue="none"
						id="new_value"
						name="new_value"
						required={true}
					/>
				</Grid>
				<Grid container item style={{marginTop: 30}} justify="flex-end">
					<Grid item xs={3}>
						<Button
							id="cancel"
							variant="outlined"
							color="secondary"
							size="small"
							onClick={props.handleMatchClose}
						>Cancel</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							id="submit"
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

}

export default MatchModal

