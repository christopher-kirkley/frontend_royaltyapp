import React, { useState, useEffect, useContext } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Modal from '@material-ui/core/Modal';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Context } from '../ApiStore';


const useStyles = makeStyles((theme) => ({
	paper: {
				position: 'absolute',
				width: 400,
				backgroundColor: theme.palette.background.paper,
				border: '2px solid #000',
				boxShadow: theme.shadows[5],
				padding: theme.spacing(2, 4, 3),
			},
}));


function UpdateModal(props) {
	const { catalogContext, artistsContext, upcContext, loadingContext } = useContext(Context)

	const { register, control, handleSubmit } = useForm()

	const classes = useStyles();

	const [upcs, setUpcs] = upcContext

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

	const numSelect = props.selected.length

	var sharedObj = props.selected[0]

	for (var i = 0, len = props.selected.length; i < len; i++) {
		var sharedObj = shared(sharedObj, props.selected[i+1])
	}

	function shared(obj1, obj2) {
		// Make sure an object to compare is provided
		if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
				return obj1;
			}

		var shared = {}

		var key;

		var compare = function (item1, item2, key) {

			if (item1 === item2) {
				shared[key] = item1
			}
			
			if (item1 !== item2) {
				shared[key] = 'Various'
			}

			return shared
	}

		for (key in obj1) {
				compare(obj1[key], obj2[key], key);
		}

		return shared
	}

	const [ upc, setUpc ] = useState(false)

	const [artists, setArtists] = artistsContext

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

	const [ catalog, setCatalog ] = catalogContext


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
		
	function updateChoices() {
		if (props.type == 'artist') {return artistChoices}
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
		if (props.type == 'catalog') {return catalogChoices}
	}

	const body = (
			<div style={{transform: "translate(100%, 100%)"}} className={classes.paper}>
				<Typography variant="h6" gutterBottom>Update Selected</Typography>
			<form onSubmit={handleSubmit(props.onSub)}>
				<Grid container>
					<Grid item xs={12}
						onClick={() => setUpc(!upc)}
					>
					</Grid>
					<Grid item xs={6}>
					<Typography variant="subtitle1">SET {props.type} TO</Typography>
					</Grid>
					<Grid item={6}>
						<NativeSelect
							id={props.type}>
							{ updateChoices() }
						</NativeSelect>
					</Grid>
					<Grid container item style={{marginTop: 30}} justify="flex-end">
						<Grid item xs={3}>
							<Button
								size="small"
								variant="outlined"
								color="secondary"
								onClick={props.handleClose}
							>Cancel</Button>
						</Grid>
						<Grid item xs={3}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								type="submit"
							>Update</Button>
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

export default UpdateModal

