import React from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Header from '../components/Header'
import BundleTable from './BundleTable'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Bundle() {

	const classes = useStyles()

	const history = useHistory()

	function handleImportBundle() {
		history.push('/bundle/import')
	}

	function handleClick() {
		history.push('/bundle/add')
	}

	function handleImport() {
		history.push('/bundle/import')
	}

		return (
			<Container>
				<Header name='Bundle Items'/>
				<Grid container direction="row" >
					<Grid item xs={12}>
						<Paper className={classes.paper}> 
							<Grid container justify="space-between">
								<Grid item xs={1} >
									<Typography color="textSecondary" component="h6" variant="caption" align="center">BUNDLE</Typography>
								</Grid>
								<Grid container spacing={1} item xs={3} >
									<Grid item>
									<Button
										id="add_bundle"
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
										id="import_bundle"
										size="small"
										variant="contained"
										onClick={handleImport}
										>
									Import
									</Button>
								</Grid>
								</Grid>
							</Grid>
							<BundleTable/>
							</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default Bundle
