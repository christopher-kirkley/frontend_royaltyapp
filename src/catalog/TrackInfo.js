import React from 'react'

import TrackForm from './TrackForm'

import Container from '@material-ui/core/Container';

function TrackInfo() {
	return (
		<Container style={{border: '3px solid black'}}>
		<h2>Track Info</h2>
		<TrackForm/>
		</Container>
	)
}

export default TrackInfo
