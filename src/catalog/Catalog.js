import React from 'react';

import CatalogTable from "./CatalogTable";

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Catalog() {

	const classes = useStyles()

	const history = useHistory()

	function handleImportCatalog() {
		history.push('/catalog/import')
	}

	function handleClick() {
		history.push('/catalog/add')
	}

	function handleImport() {
		history.push('/catalog/import')
	}

		return (
			<Container>
				<Header name='Catalog Items'/>
				<Grid container direction="row" >
					<Grid item xs={12}>
						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid item xs={1} >
									<Typography color="textSecondary" component="h6" variant="caption" align="center">CATALOG</Typography>
								</Grid>
								<Grid container spacing={1} item xs={3} >
									<Grid item>
									<Button
										id="add_catalog"
										size="small"
										variant="contained"
										color="secondary"
										onClick={handleClick}
										>
									Add
									</Button>
								</Grid>
								<Grid item xs={1} >
									<Button
										id="import_catalog"
										size="small"
										variant="contained"
										onClick={handleImport}
										>
									Import
									</Button>
								</Grid>
								</Grid>
							</Grid>
							<CatalogTable/>
							</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default Catalog
