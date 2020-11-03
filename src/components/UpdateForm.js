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

	useEffect(() => {
				fetch('http://localhost:5000/version')
				.then(res => res.json())
				.then(json => setUpcs(json))
			}, [])

	const [ upcs, setUpcs ] = useState([])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.upc} : {upc.version_number}
				</option>
			)
		})

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
					id={artist.id}
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
						id={catalog.id}
						value={catalog.catalog_number}
					>{catalog.catalog_number}
					</option>
				)
			})
		
	function updateChoices() {
		if (props.type == 'artist') {return artistChoices}
		if (props.type == 'upc') {return upcChoices}
		if (props.type == 'type') {
			return (
				<React.Fragment>
					<option
						id="1"
						value="advance"
					>
					Advance
					</option>
					<option
						id="2"
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
				<Grid item xs={2}>
					<Typography variant="caption">{ Object.keys(props.selectedRowIds).length } rows selected.</Typography>
				</Grid>
				<Grid item xs={10}>
					<form onSubmit={handleSubmit(props.submitUpdateErrors)}>
						<Grid container justify="space-around">
							<Grid item xs={4} align="right">
							<Typography variant="subtitle1">Set {props.type} to</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									as={
										<NativeSelect>
										<option disabled="true" value="none">Select...</option>
										{ updateChoices() }
										</NativeSelect>
									}
									control={control}
									id="new_value"
									name="new_value"
									defaultValue="none"
								/>
							</Grid>
							<Grid item xs={1}>
								<Button
									id="update"
									variant="contained"
									color="primary"
									size="small"
									type="submit"
								>
								Update
								</Button>
							</Grid>
							<Grid item xs={1}>
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

