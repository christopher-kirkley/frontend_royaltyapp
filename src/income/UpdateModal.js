import React, { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Modal from '@material-ui/core/Modal';

import { makeStyles, useTheme } from '@material-ui/core/styles';

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

	const { register, control, handleSubmit } = useForm()

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

	const body = (
			<div style={{transform: "translate(100%, 100%)"}} className={classes.paper}>
				<Typography variant="h6" gutterBottom>Update Selected</Typography>
				<Grid container>
					<Grid item xs={12}
						onClick={() => setUpc(!upc)}
					>
						<Typography variant="subtitle1">UPC: { sharedObj.upc_id }</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1">Distributor: { sharedObj.distributor }</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1">Catalog: { sharedObj.catalog_id }</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1">Medium: { sharedObj.medium }</Typography>
					</Grid>
					<Grid item xs={12}>
					<Typography variant="subtitle1">Type: { sharedObj.type }</Typography>
					</Grid>
					<Grid item xs={12}>
					<Typography variant="subtitle1">Description: { sharedObj.description }</Typography>
					<Divider style={{marginTop: 5, marginBottom: 5}}/>
					</Grid>
					<Grid item xs={6}>
					<Typography variant="subtitle1">SET VERSION TO</Typography>
					</Grid>
					<Grid item={6}>
						<NativeSelect
							id="new_upc">
							{upcChoices}
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
							>Update</Button>
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

export default UpdateModal

