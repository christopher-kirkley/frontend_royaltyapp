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
			},
}));


function UpdateForm(props) {

	const { register, control, handleSubmit } = useForm()

	const classes = useStyles();


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

	const [ upc, setUpc ] = useState(false)

	const [artists, setArtists] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/artists')
				.then(res => res.json())
				.then(json => setArtists(json))
			}, [])

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

	const [ catalog, setCatalog ] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/catalog')
				.then(res => res.json())
				.then(json => setCatalog(json))
			}, [])

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


	return (
		<React.Fragment>
			<Grid container style={{padding: 20}}>
				<Grid item xs={6}>
					<Typography variant="caption">{ Object.keys(props.selectedRowIds).length } rows selected.</Typography>
				</Grid>
				<Grid item xs={6}>
					<form onSubmit={handleSubmit(props.onSub)}>
						<Grid container justify="space-around">
							<Grid item xs={4} align="right">
							<Typography variant="subtitle1">Set {props.type} to</Typography>
							</Grid>
							<Grid item={4}>
								<NativeSelect
									id={props.type}>
									{ updateChoices() }
								</NativeSelect>
							</Grid>
							<Grid item xs={2}>
								<Button
									id="update"
									variant="contained"
									color="primary"
									size="small"
								>
								Update
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Button
									id="delete"
									variant="contained"
									size="small"
								>
								Delete
								</Button>
							</Grid>
						</Grid>
				</form>
				</Grid>
			</Grid>
			<Divider/>
		</React.Fragment>
	)
}

export default UpdateForm

