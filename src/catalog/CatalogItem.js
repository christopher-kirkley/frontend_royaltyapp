import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import CatalogInfo from './CatalogInfo'
import VersionInfo from './VersionInfo'
import TrackInfo from './TrackInfo'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function CatalogItem() {

	return (
		<Container>
			<h2>Catalog Item</h2>
			<CatalogInfo/>
			<VersionInfo/>
			<TrackInfo/>
		</Container>
	)
}

export default CatalogItem
