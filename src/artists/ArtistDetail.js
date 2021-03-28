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
 
const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	}
}))

function ArtistDetail () {

	const classes = useStyles()

	const { id } = useParams()

	const [artist, setArtist] = useState([])

	const [contact, setContact] = useState([])

	const [edit, setEdit] = useState(false)
	
	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/artists/${id}`)
		.then(res => res.json())
		.then(json => {
			setArtist(json)
		}
		)
	
		}
	}, [])

	function editArtist(data) {
		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom
		fetch(`http://localhost:5000/artists/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(res => {

			const contact_id = 1
			const contact_prenom = data.contact_prenom
			const contact_middle = data.contact_middle
			const contact_surnom = data.contact_surnom
			const address = data.address
			const phone = data.phone
			const bank_name = data.bank_name
			const bban = data.bban
			const notes = data.notes

			console.log(notes)

			fetch(`http://localhost:5000/contacts/${contact_id}`, {
				method: 'PUT',
				body: JSON.stringify({
					contact_prenom,
					contact_middle,
					contact_surnom,
					address,
					phone,
					bank_name,
					bban,
					notes
					}),
			})

		})
		.then(json => history.push('/artists/'))
	}

	function onSubmit(data) {
		editArtist(data)
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
		})
		.then(res => res.json())
		.then(json => history.push('/artists/'))
	}

	return (
			<Container>
			<Header name='Artist Detail'/>
				<Grid container justify="space-between">
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
					<ArtistForm onSubmit={onSubmit} id={id} edit={edit} />
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
		<Divider/>
		<Grid container justify="space-between">
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
