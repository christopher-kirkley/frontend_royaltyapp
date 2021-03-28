import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArtistFields from './ArtistFields'
import ContactFields from './ContactFields'
import Header from '../components/Header'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	textField: {
		'& input:disabled': { 
			color: 'black',

		}
	},
}))

function ArtistForm (props) {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])

	const [contact, setContact] = useState([])
	
	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/artists/${props.id}`)
		.then(res => res.json())
		.then(json => {
			setArtist(json)
			console.log(json['contact'])
			setContact(json['contact'][0])
		})
		}
	}, [])

	useEffect(() => {
		
		setValue([
			{artist_name: artist.artist_name},
			{prenom: artist.prenom},
			{surnom: artist.surnom},
			{id: artist.id},
			{contact_prenom: contact.prenom},
			{contact_middle: contact.middle},
			{contact_surnom: contact.surnom},
			{phone: contact.phone},
			{address: contact.address},
			{bank_name: contact.bank_name},
			{bban: contact.bban},
			{notes: contact.notes},
		])
	}, [contact])

	return (
				<form onSubmit={handleSubmit(props.onSubmit)} id="form">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Paper elevation={3} className={classes.paper}>
							<Typography variant="h6" color="textSecondary" align="center">Artist Info</Typography>
							<ArtistFields
								setValue={setValue}
								control={control}
								edit={props.edit}/>
							</Paper>
						</Grid>
	{/*----------- Contacts ---------- */}
						<Grid item xs={12}>
							<Paper elevation={3} className={classes.paper}>
							<Typography variant="h6" color="textSecondary" align="center">Contact Info</Typography>
							<ContactFields
								setValue={setValue}
								control={control}
								edit={props.edit}/>
							</Paper>
						</Grid>
					</Grid>
				</form>

	)}



export default ArtistForm;
