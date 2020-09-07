import React from 'react'

import TrackForm from './TrackForm'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function TrackInfo() {
	return (
		<Container>
		<Typography variant="h6">Track Info</Typography>
		<TrackForm/>
		</Container>
	)
}

export default TrackInfo
