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

	const [contacts, setContacts] = useState([])

	const [contact, setContact] = useState({})

	useEffect(() => { 
			fetch('http://localhost:5000/contacts')
			.then(res => res.json())
			.then(json => {
				setContacts(json)
			})

	}, [])

	useEffect(() => { 
		if (props.id) {
			fetch(`http://localhost:5000/catalog/${props.id}`)
			.then(res => res.json())
			.then(json => setCatalog(json))
	}}, [])

	
	const contactChoices = contacts.map((contact, i) =>
		<option id={contact.id} value={contact.id}>{contact.prenom} {contact.surnom}</option>
	)

	const [choice, setChoice] = useState('')

	useEffect(() => { 
		if (props.contact) {
			console.log(props.contact)
			setChoice(props.contact.id)
	}}, [])

	function getContact(id) {
	if (id != 'none' && id != 'new') {
		setChoice(id)
		console.log(choice)
			fetch(`http://localhost:5000/contacts/${id}`)
			.then(res => res.json())
			.then(json => setContact(json))
	}
	}



	return (

				<Grid container
						direction="column"
						>
					<Grid item xs={6}>
						<InputLabel htmlFor="contact">Contact Name</InputLabel>
						<NativeSelect
							fullWidth
							id="contact_id"
							value={choice}
							onChange={(e)=>{
								setChoice(e.target.value)
								getContact(e.target.value)}
							}>
							<option id="none" name="none" value="none">None</option>
							<option id="new" name="new" value="new">New</option>
							{contactChoices}
						</NativeSelect>
		{
			choice == 'none' &&
			null
		}
		{
			choice == 'new' &&
				<React.Fragment>
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
				</React.Fragment>

		}
		
		{
			choice != 'new' && choice != 'none' &&
				<React.Fragment>
					<Grid item xs={12}>
						<Controller
							type="hidden"
							as={TextField}
							control={props.control}
							defaultValue={contact.id}
							name='id'
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
							defaultValue={contact.phone}
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
							defaultValue={props.contact.bank_name}
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
							defaultValue={contact.bban}
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
							defaultValue={contact.notes}
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
