import React from 'react';

import CatalogTable from "./CatalogTable";

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function ViewCatalog() {

	const classes = useStyles()

	const history = useHistory()

	function handleImportCatalog() {
		history.push('/catalog/import')
	}

	function handleClick() {
		history.push('/catalog/add')
	}

		return (
			<Container>
				<Header name='Catalog Items'/>
				<Paper elevation={4} className={classes.paper}>
					<CatalogTable/>
				</Paper>
			</Container>
		)
	}


export default ViewCatalog
