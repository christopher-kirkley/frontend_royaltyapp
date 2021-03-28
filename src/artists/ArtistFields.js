import React, { useState, useEffect, useContext } from 'react'

import { useForm, Controller, defaultValue, useFieldArray } from 'react-hook-form'

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'

import Header from '../components/Header'
import ConditionalButton from '../components/ConditionalButton'

import { makeStyles } from '@material-ui/core/styles'

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	modal: {
		position: "absolute",
		width: 900,
		backgroundColor: "white",
		border: '2px solid #000',
		boxShadow: theme.shadows[5],

	}
}))

function ArtistFields(props) {

	const classes = useStyles()

	const { artistsContext } = useContext(Context)

	const [catalog, setCatalog ] = useState('')

	const [artists, setArtists] = artistsContext

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => setCatalog(json))
	}}, [])

	useEffect(() => {
		const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
		const artist_id = catalog && catalog.artist ? catalog.artist.id : 1;
		
		props.setValue([
			{catalog_number: catalog.catalog_number},
			{catalog_name: catalog.catalog_name},
			{artist_name: artist_name},
			{artist_id: artist_id},
		])
	}, [catalog])
	
	const artistChoices = artists.map((artist, i) =>
		<option id={artist.id} value={artist.id}>{artist.artist_name}</option>
	)

	return (
				<Grid container
						direction="column"
						alignItems="center">
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="artist_name"
							id="artist_name"
							defaultValue=""
							control={props.control}
							label="Artist Name"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="prenom"
							id="prenom"
							control={props.control}
							label="Prenom"
							defaultValue=""
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="surnom"
							id="surnom"
							control={props.control}
							label="Surnom"
							defaultValue=""
							style={{marginBottom: 20}}
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
			</Grid>
	)
	
}

export default ArtistFields
