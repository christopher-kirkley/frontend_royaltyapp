import React from 'react'

import TrackForm from './TrackForm'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function TrackInfo() {
	return (
		<Container>
			<Typography variant="h6" color="textSecondary" align="center">Tracks</Typography>
			<TrackForm/>
		</Container>
	)
}

export default TrackInfo
