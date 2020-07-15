import React from 'react'

import CatalogInfo from './CatalogInfo'
import VersionInfo from './VersionInfo'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Header from '../components/Header'

function CatalogItem() {

	return (
		<Container>
			<Header name='Catalog Item'/>
			<CatalogInfo/>
			<VersionInfo/>
			<TrackInfo/>
		</Container>
	)
}

export default CatalogItem
