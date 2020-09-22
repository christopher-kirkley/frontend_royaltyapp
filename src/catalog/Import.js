import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Header from '../components/Header'
import ImportCatalog from './ImportCatalog'
import ImportVersion from './ImportVersion'


function Import () {
	return (
			<Container>
				<Header name='Import CSV'/>
				<Paper elevation={3} style={{marginTop: 20, padding: 10}}>
					<ImportCatalog/>
				</Paper>
				<Paper elevation={3} style={{marginTop: 20, padding: 10}}>
					<ImportVersion/>
				</Paper>
			</Container>
		
	)
}

export default Import

