import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import VersionTable from './VersionTable'
import VersionForm from './VersionForm'
import NewVersionForm from './NewVersionForm'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function VersionInfo() {

	const [version, setVersion] = useState([])

	const { id } = useParams()

	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setVersion(json['version']))
	}, [])


	function onChange() {
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setVersion(json['version']))
	}

	return (
		<Container style={{border: '3px solid black'}}>
			<h2>Version Info</h2>
			<VersionForm version={version}/>
			<NewVersionForm onChange={onChange}/>
		</Container>
	)
}

export default VersionInfo
