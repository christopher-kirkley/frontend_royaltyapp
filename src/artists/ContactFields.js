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

	const [contacts, setContacts] = useState([])
	
	useEffect(() => { 
			fetch('http://localhost:5000/contacts', {
				method: 'GET',
				credentials: 'include'
			})
			.then(res => res.json())
			.then(json => {
				setContacts(json)
			})

	}, [])

	const contactChoices = contacts.map((contact, i) =>
		<option id={contact.id} value={contact.id}>{contact.prenom} {contact.surnom}</option>
	)


	const [contact, setContact] = useState('')

	function getContact(id) {
	if (id != 'none' && id != 'new') {
		fetch(`http://localhost:5000/contacts/${id}`, {
			method: 'GET',
			credentials: 'include'
		})
		.then(res => res.json())
		.then(json => setContact(json))
		console.log(contact)
	}
	}

	
	useEffect(() => {
		
		props.setValue([
			{id: contact.id},
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
		<Grid container
			direction="column"
			alignItems="center"
		>
			<Grid item xs={8}>
				<InputLabel htmlFor="contact">Contact Name</InputLabel>
				<NativeSelect
					disabled={props.edit ? false : true }
					fullWidth
					id="contact_id"
					value={props.contactId}
					onChange={(e)=>{
						props.setContactId(e.target.value)
						getContact(e.target.value)
					}
					}
				>
					{contactChoices}
					<option id="none" name="none" value="none">None</option>
					<option id="new" name="new" value="new">New</option>
				</NativeSelect>
		{
			props.contactId == 'none' &&
			null
		}

		{
			props.contactId == 'new' &&
				<React.Fragment>
					<Grid item xs={12}>
						<Controller
							as={TextField}
							name="new_contact_prenom"
							id="new_contact_prenom"
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
							name="new_contact_middle"
							id="new_contact_middle"
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
							name="new_contact_surnom"
							id="new_contact_surnom"
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
							name="new_address"
							id="new_address"
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
							name="new_phone"
							id="new_phone"
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
							name="new_bank_name"
							id="new_bank_name"
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
							name="new_bban"
							id="new_bban"
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
							name="new_notes"
							id="new_notes"
							control={props.control}
							defaultValue=""
							label="Notes"
							InputProps={{
								className: classes.textField,
							}}
							disabled={props.edit ? false : true }
						/>	
					</Grid>
				</React.Fragment>

		}
		
		{
			props.contactId != 'new' && props.contactId != 'none' &&
				<React.Fragment>
					<Grid item xs={12}>
						<Controller
							type="hidden"
							as={TextField}
							control={props.control}
							defaultValue=""
							name='id'
							id="id"
						/>
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
				</React.Fragment>

		}
						
					</Grid>
			</Grid>
	)
	
}


//
//

export default ContactFields
