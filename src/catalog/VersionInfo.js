import React from 'react'

import VersionTable from './VersionTable'
import VersionForm from './VersionForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



function VersionInfo() {
	return (
		<Container style={{border: '3px solid black'}}>
			<h2>Version Info</h2>
			<VersionForm />
		</Container>
	)
}

export default VersionInfo
