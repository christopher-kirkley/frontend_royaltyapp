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

function ContactFields(props) {

	const classes = useStyles()

	const { artistsContext } = useContext(Context)

	const [catalog, setCatalog ] = useState('')

	// const [artists, setArtists] = artistsContext
	
	const [contacts, setContacts] = useState([])

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => setCatalog(json))
	}}, [])

	// useEffect(() => {
	// 	const artist_name = catalog && catalog.artist ? catalog.artist.artist_name : null;
	// 	const artist_id = catalog && catalog.artist ? catalog.artist.id : 1;
		
	// 	props.setValue([
	// 		{contact_prenom: props.contact.prenom},
	// 		{contact_middle: props.contact.middle},
	// 		{contact_surnom: props.contact.surnom},
	// 		{phone: props.contact.phone},
	// 		{address: props.contact.address},
	// 		{bank_name: props.contact.bank_name},
	// 		{bban: props.contact.bban},
	// 		{notes: props.contact.notes},
	// 	])
	// }, [props.contact])
	
	const contactChoices = contacts.map((contact, i) =>
		<option id={contact.id} value={contact.id}>{contact.prenom} {contact.surnom}</option>
	)

	return (
		// <Grid container spacing={1} alignItems="center" justify="center">
		// 	<Grid item xs={7}>
		// 		<Controller
		// 			as={TextField}
		// 			control={props.control}
		// 			name="catalog_number"
		// 			required
		// 			fullWidth
		// 			label="Catalog Number"
		// 			id="catalog_number"
		// 			autoComplete="catalog number"
		// 			autoFocus
		// 			defaultValue=""
		// 			disabled={props.edit ? false: true}
		// 		/>
		// 	</Grid>
		// 	<Grid item xs={7}>
		// 		<Controller
		// 			as={TextField}
		// 			control={props.control}
		// 			name="catalog_name"
		// 			required
		// 			fullWidth
		// 			label="Title"
		// 			id="catalog_name"
		// 			autoComplete="catalog name"
		// 			autoFocus
		// 			defaultValue=""
		// 			disabled={props.edit ? false: true}
		// 		/>
		// 	</Grid>
		// 	<Grid item xs={7}>
		// 		<InputLabel htmlFor="catalog_artist">Primary Artist</InputLabel>
		// 			<Controller
		// 				name="artist_id"
		// 				required
		// 				id="artist_name"
		// 				as={<NativeSelect>
		// 						{artistChoices}
		// 						</NativeSelect>}
		// 				control={props.control}
		// 				fullWidth
		// 				disabled={props.edit ? false: true}
		// 			/>
		// 	</Grid>
		// </Grid>

				<Grid container
						direction="column"
						>
					<Grid item xs={6}>
						<InputLabel htmlFor="contact">Contact Name</InputLabel>
							<Controller
								name="contact_id"
								required
								id="contact_name"
								as={<NativeSelect>
										<option>Select New</option>
										{contactChoices}
										</NativeSelect>}
								control={props.control}
								fullWidth
								disabled={props.edit ? false: true}
							/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="contact_prenom"
							id="contact_prenom"
							defaultValue=""
							control={props.control}
							label="Prenom"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="contact_middle"
							id="contact_middle"
							control={props.control}
							label="Middle Name"
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
							name="contact_surnom"
							id="contact_surnom"
							control={props.control}
							label="Surnom"
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
							name="address"
							id="address"
							control={props.control}
							defaultValue=""
							label="Address"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="phone"
							id="phone"
							defaultValue=""
							control={props.control}
							label="Phone"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="bank_name"
							id="bank_name"
							defaultValue=""
							control={props.control}
							label="Bank Name"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="bban"
							id="bban"
							defaultValue=""
							control={props.control}
							label="BBAN"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="notes"
							id="notes"
							control={props.control}
							defaultValue=""
							label="Notes"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
			</Grid>
	)
	
}

export default ContactFields
