import React, { useState, useEffect, useContext } from 'react';

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

		fetch('http://localhost:5000/contacts', {
			method: 'POST',
			body: JSON.stringify(
				{
					'artist_id': id,
					'contact_prenom': data['contact_prenom'],
					'contact_middle': data['contact_middle'],
					'contact_surnom': data['contact_surnom'],
					'address': data['address'],
					'phone': data['phone'],
					'bank_name': data['bank_name'],
					'bban': data['bban'],
					'notes': data['notes'],
				})
		})
	}

	function addArtist(data) {
		const artist_name = data.artist_name
		const prenom = data.prenom
		const surnom = data.surnom
		fetch('http://localhost:5000/artists', {
			method: 'POST',
			body: JSON.stringify({ artist_name, prenom, surnom }),
		})
		.then(res => res.json())
		.then(res => res['id'])
		.then(id => (
			addContact(data, id)
		))
		.then(res => updateArtists())
		.then(json => history.push('/artists/'))
	}
	
	function updateArtists() {
		setLoading(true)
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.artist_name < b.artist_name) {return -1;}
				if(a.artist_name > b.artist_name) {return 1;}
			})
			setArtists(sorted)
			setLoading(false)
		})
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
				<ArtistForm onSubmit={onSubmit} edit={true}/>
			</Grid>
		</Container>
	)}



export default ArtistAdd;
