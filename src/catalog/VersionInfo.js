import React from 'react'
import { useParams } from 'react-router-dom'

import VersionTable from './VersionTable'
import VersionForm from './VersionForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function VersionInfo() {

	const { id } = useParams()

	return (
		<Container style={{border: '3px solid black'}}>
			<h2>Version Info</h2>
				<VersionForm id={id}/>
		</Container>
	)
}

export default VersionInfo
