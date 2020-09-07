import React from 'react'
import { useParams } from 'react-router-dom'

import VersionTable from './VersionTable'
import VersionForm from './VersionForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


function VersionInfo() {

	const { id } = useParams()

	return (
		<Container>
			<Typography variant="h6" color="textSecondary" align="center">Versions</Typography>
				<VersionForm id={id}/>
		</Container>
	)
}

export default VersionInfo
