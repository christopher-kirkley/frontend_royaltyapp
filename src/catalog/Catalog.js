import React, { useState, useEffect } from 'react';

import AddCatalogItem from "./AddCatalogItem";
import CatalogTable from "./CatalogTable";

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function Catalog() {

	const history = useHistory()

	function handleClick() {
		history.push('/catalog/add')
	}

		return (
			<Container>
				<h1 id="header">All Catalog</h1>
				<CatalogTable/>
				<Button variant="contained" color="primary" id="add-catalog-item" onClick={handleClick}>Add Catalog Item</Button>
			</Container>
		)
	}


export default Catalog
