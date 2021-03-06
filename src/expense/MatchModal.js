import React, { useState, useEffect, useContext } from 'react'

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

import { Context } from '../ApiStore';

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
	const { catalogContext, trackContext, artistsContext, upcContext, loadingContext } = useContext(Context)
	const [artists, setArtists] = artistsContext
	const [catalog, setCatalog] = catalogContext
	const [upcs, setUpcs] = upcContext
	const [tracks, setTracks] = trackContext


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

	const artistChoices = artists.map((artist) =>
		{
			return (
				<option
					id={artist.artist_id}
					value={artist.artist_name}
				>{artist.artist_name}
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
			if (id === 'date')
			{return row.date}
			if (id === 'vendor')
			{return row.vendor}
			if (id === 'artist_id')
			{return row.artist_id}
			if (id === 'catalog_number')
			{return row.catalog_number}
			if (id === 'description')
			{return row.description}
			if (id === 'net')
			{return row.net}
			if (id === 'item_type')
			{return row.item_type}
			if (id === 'expense_type')
			{return row.expense_type}
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

	function updateChoices() {
		if (props.type === 'track') {
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
		}

		if (props.type == 'upc') {return upcChoices}
		if (props.type == 'artist') {return artistChoices}
		if (props.type == 'catalog') {

			const catalogChoices = catalog.map((catalog) =>
				{
					return (
						<option
							id={catalog.catalog_id}
							value={catalog.catalog_number}
						>{catalog.catalog_number}
						</option>
					)
				})
		
			return catalogChoices

		}

		if (props.type == 'type') {

			return (
				<React.Fragment>
					<option
						id="advance"
						value="advance"
					>
					Advance
					</option>
					<option
						id="recoupable"
						value="recoupable"
					>
					Recoupable
					</option>
				</React.Fragment>
			)

		}
	}

	return (
		<div className={classes.paper, classes.list}>
		<Typography variant="h6" gutterBottom>Conditional Match</Typography>
		<Typography variant="subtitle1" gutterBottom>Apply to transactions where</Typography>
			<form onSubmit={handleSubmit(props.onSub)}>
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
					<Typography variant="subtitle1" gutterBottom>
					Then assign new {props.type}
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<Controller
						as={<NativeSelect
								id="new_value">
								<option value="none" disabled="true">Select...</option>
									{updateChoices()}
								</NativeSelect>
						}
						control={control}
						defaultValue="none"
						id="new_value"
						name={props.type}
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

