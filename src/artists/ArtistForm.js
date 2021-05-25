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
import { service } from '../_services/services';
 
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

	const { handleSubmit, control, setValue, watch } = useForm()
	
	const history = useHistory();

	const [contactId, setContactId] = useState('none')

	const [contactInfo, setContactInfo] = useState({})

	useEffect(() => { 
		
		// check to see if new record or editing existing record
		if (props.type !== 'add') {
		service.getAll(`artists/${id}`)
		.then(json => {
			console.log(json)
			setArtist(json)

			console.log(json['contact'])
			if (json['contact']) {
			setContactId(json['contact'].id)
			setContactInfo(json['contact'])
			}
			})
	}
		
	}, [])

	useEffect(() => {
			setValue([
				{artist_name: artist.artist_name},
				{prenom: artist.prenom},
				{surnom: artist.surnom},
				{id: artist.id},
			])
		
	}, [artist])

	useEffect(() => {
		
		setValue([
			{id: contactInfo.id},
			{contact_prenom: contactInfo.prenom},
			{contact_middle: contactInfo.middle},
			{contact_surnom: contactInfo.surnom},
			{phone: contactInfo.phone},
			{address: contactInfo.address},
			{bank_name: contactInfo.bank_name},
			{bban: contactInfo.bban},
			{notes: contactInfo.notes},
		])
	}, [contactInfo])

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
								contactId={contactId}
								setContactId={setContactId}
								control={control}
								// watch={watch}
								edit={props.edit}/>
							</Paper>
						</Grid>
					</Grid>
				</form>

	)}



export default ArtistForm;
