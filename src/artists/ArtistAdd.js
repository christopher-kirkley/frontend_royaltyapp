import React, { useState, useEffect, useContext } from 'react';
import Cookies from "js-cookie";

import { useParams, useHistory } from 'react-router-dom'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../components/Header'
import ArtistForm from './ArtistForm'
import EditButton from '../components/EditButton'
 
import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';
import { get_csrf_token } from '../csrf'
import { service } from '../_services/services.js'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	}
}))

function ArtistAdd () {

	const { catalogContext, artistsContext, loadingContext } = useContext(Context)

	const [artists, setArtists] = artistsContext

	const [loading, setLoading] = loadingContext

	const classes = useStyles()

	const { handleSubmit, control, setValue } = useForm()
	
	const history = useHistory();

	function addContact(data, id) {

		const obj = {
					'artist_id': id,
					'contact_prenom': data['new_contact_prenom'],
					'contact_middle': data['new_contact_middle'],
					'contact_surnom': data['new_contact_surnom'],
					'address': data['new_address'],
					'phone': data['new_phone'],
					'bank_name': data['new_bank_name'],
					'bban': data['new_bban'],
					'notes': data['new_notes'],
		}

		service.postItem('contacts', obj)
	}


	function addArtist(data) {
		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom

		const obj = { artist_name, prenom, surnom }
		service.postItem('artists', obj)
		.then(res => res['id'])
		.then(id => (
			addContact(data, id)
		))
		.then(res => updateArtists())
		.then(json => history.push('/artists/'))
	}
	
	function updateArtists() {
		setLoading(true)
		service.getAll('artists')
		.then(data => setArtists(data))
		.then(res => setLoading(false))
	}

	function onSubmit(data) {
		addArtist(data)
	}

	function handleCancel(props) {
			history.push('/artists/')
	}

	return (
		<Container>
		<Header name='New Artist'/>
			<Grid container justify="flex-end">
				<Grid item xs={2} style={{marginBottom: 20}}>
					<EditButton handleCancel={handleCancel}/>
				</Grid>
			</Grid>
			<Grid item={12}>
		 <ArtistForm onSubmit={onSubmit} edit={true} type={'add'}/>
			</Grid>
	
		</Container>
	)}



export default ArtistAdd;
