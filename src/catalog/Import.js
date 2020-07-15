import React, { useState } from 'react';

import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Header from '../components/Header'
import ImportCatalog from './ImportCatalog'
import ImportVersion from './ImportVersion'


function Import () {
	return (
			<Container>
				<Header name='Import'/>
					<ImportCatalog/>
					<ImportVersion/>
			</Container>
		
	)
}

export default Import

