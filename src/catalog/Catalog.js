import React from 'react';

import AddCatalogItem from "./AddCatalogItem";
import CatalogTable from "./CatalogTable";

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

function Catalog() {

	const history = useHistory()

	function handleImportCatalog() {
		history.push('/catalog/import')
	}

	function handleClick() {
		history.push('/catalog/add')
	}

		return (
			<Container>
				<Header name='Catalog'/>
				<CatalogTable/>
				<Button variant="contained" color="primary" id="add-catalog-item" onClick={handleClick}>Add Catalog Item</Button>
				<Button variant="contained" color="primary" id="import_catalog" onClick={handleImportCatalog}>Import Catalog</Button>
			</Container>
		)
	}


export default Catalog
