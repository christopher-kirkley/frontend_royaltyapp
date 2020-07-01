import React from 'react'

import VersionTable from './VersionTable'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



function VersionInfo() {
	return (
		<Container style={{border: '3px solid black'}}>
			<h2>Version Info</h2>
			<VersionTable/>
			<Button variant="contained" color="primary" id="add_version" name="add_version">Add Version</Button>
		</Container>
	)
}

export default VersionInfo
