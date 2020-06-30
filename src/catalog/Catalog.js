import React, { useState, useEffect } from 'react';

import AddCatalogItem from "./AddCatalogItem";
import CatalogTable from "./CatalogTable";

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function Catalog() {

	const [addCatalog, setAddCatalog] = useState(false)

	function handleClick() {
		setAddCatalog(true)
	}

		return (
			<div className="component">
				{addCatalog ?
					<div>
						<h1 id="header">Add Catalog Item</h1>
						<AddCatalogItem onChange={() => setAddCatalog(false)}/>
					</div>
					:
					<div>
					<h1 id="header">Catalog</h1>
					<CatalogTable/>
					<Button variant="contained" color="primary" id="add-catalog-item" onClick={handleClick}>Add Catalog Item</Button>
					</div>
				}
			</div>
		)
	}


export default Catalog
