import React from 'react';

import Container from '@material-ui/core/Container';

import Header from '../components/Header'
import MatchingTable from './MatchingTable'

function MatchingErrors() {

		return (
			<Container>
				<Header name='Income Matching Errors'/>
				<MatchingTable />
			</Container>
		)
	}


export default MatchingErrors
