import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
import EditButton from '../components/EditButton'
import Toggle from '../components/Toggle'

import ArtistForm from './ArtistForm'
import ArtistTracks from './ArtistTracks'

import { get_csrf_token } from '../csrf'
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	}
}))


function ArtistDetail () {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])

	// const [contact, setContact] = useState([])

	const [edit, setEdit] = useState(false)
	
	const { handleSubmit, control, setValue, watch } = useForm()
	
	const history = useHistory();

	function updateContact(data) {
			const contact_id = data.id ? data.id : ''
			const contact_prenom = data.contact_prenom ? data.contact_prenom : ''
			const contact_middle = data.contact_middle ? data.contact_middle : ''
			const contact_surnom = data.contact_surnom ? data.contact_surnom : ''
			const address = data.address ? data.address : ''
			const phone = data.phone ? data.phone : ''
			const bank_name = data.bank_name ? data.bank_name : ''
			const bban = data.bban ? data.bban : ''
			const notes = data.notes ? data.notes : ''

			fetch(`http://localhost:5000/contacts/${contact_id}`, {
				method: 'PUT',
				credentials: 'include',
				headers: { 'X-CSRF-TOKEN': get_csrf_token() }, 
				body: JSON.stringify({
					contact_prenom,
					contact_middle,
					contact_surnom,
					address,
					phone,
					bank_name,
					bban,
					notes,
					})
		})

	}

	function postContact(data) {
				const contact_prenom = data.new_contact_prenom ? data.new_contact_prenom : ''
				const contact_middle = data.new_contact_middle ? data.new_contact_middle : ''
				const contact_surnom = data.new_contact_surnom ? data.new_contact_surnom : ''
				const address = data.new_address ? data.new_address : ''
				const phone = data.new_phone ? data.new_phone : ''
				const bank_name = data.new_bank_name ? data.new_bank_name : ''
				const bban = data.new_bban ? data.new_bban : ''
				const notes = data.new_notes ? data.new_notes : ''

				fetch('http://localhost:5000/contacts', {
					method: 'POST',
					credentials: 'include',
					headers: { 'X-CSRF-TOKEN': get_csrf_token() }, 
					body: JSON.stringify(
						{
							'artist_id': id,
							'contact_prenom': contact_prenom,
							'contact_middle': contact_middle,
							'contact_surnom': contact_surnom,
							'address': address,
							'phone': phone,
							'bank_name': bank_name,
							'bban': bban,
							'notes': notes,
						})
				})
				.then(res => res.json())
				.then(json => {
					const contact_id = json['id']
					const artist_name = data.artist_name
					const prenom = data.prenom
					const surnom = data.surnom
					fetch(`http://localhost:5000/artists/${id}`, {
						method: 'PUT',
						credentials: 'include',
						headers: { 'X-CSRF-TOKEN': get_csrf_token() }, 
						body: JSON.stringify({ artist_name, prenom, surnom, contact_id }),
					})
				})

		
	}

	function editArtist(data) {

		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom
		const contact_id = data.id ? data.id : ''

		fetch(`http://localhost:5000/artists/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ artist_name, prenom, surnom, contact_id }),
			credentials: 'include',
			headers: { 'X-CSRF-TOKEN': get_csrf_token() }, 
		})
		.then(res => res.json())
		.then(res => {
			if (data.id)
			{updateContact(data)}
			if (data.new_contact_prenom)
			{postContact(data)}

		})

	}

	function onSubmit(data) {
		editArtist(data)
		handleEdit()
	}

	function handleEdit() {
		setEdit(!edit)
	}

	function handleCancel() {
		handleEdit()
	}

	function handleDelete() {
		fetch(`http://localhost:5000/artists/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'X-CSRF-TOKEN': get_csrf_token() }, 
		})
		.then(res => res.json())
		.then(json => history.push('/artists/'))
	}

	return (
			<Container>
			<Header name='Artist Detail'/>
				<Grid container justify="space-between" style={{marginBottom: 20}}>
					<Grid item xs={2}>
						<Toggle
							edit={edit}
							handleEdit={handleEdit}
							/>
					</Grid>
					<Grid item xs={2} >
					{ edit ?
						<EditButton
							edit={edit}
							handleEdit={handleEdit}
							handleCancel={handleCancel}
							/> : null }
					</Grid>
				</Grid>
				<Grid item={12}>
					<ArtistForm
						onSubmit={onSubmit}
						// id={id}
						edit={edit}
					/>
					{ edit ?
						<Button 
							size="small"
							variant="outlined"
							color="secondary"
							id="cancel"
							onClick={handleDelete}
							>
							Delete
						</Button>
						:
						null
					}
				</Grid>
		<Divider style={{marginBottom: 20}}/>
		<Grid container justify="space-between" style={{marginBottom: 20}}>
			<Grid item={12}>
				<Paper elevation={3} className={classes.paper}>
				<Typography>Appears On</Typography>
				<ArtistTracks/>
				</Paper>
			</Grid>
		</Grid>
		</Container>
	)}


export default ArtistDetail;
