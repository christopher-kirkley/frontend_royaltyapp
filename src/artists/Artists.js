import React from 'react';

import ArtistTable from "./ArtistTable";
import Header from "../components/Header";

import { Redirect } from 'react-router-dom'
import {
	NavLink
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function Artist() {

	const classes = useStyles()

	const history = useHistory();

	function handleClick() {
		history.push('/artist/add')
	}

	return (
		<Container>
		<Header name="Artists"/>
		<Grid container direction="row" >
			<Grid item xs={12}>
				<Paper className={classes.paper}> 
					<Grid container justify="space-between">
						<Grid item xs={1} >
							<Typography color="textSecondary" component="h6" variant="caption" align="center">ARTISTS</Typography>
						</Grid>
						<Grid item xs={1} >
							<Button
								size="small"
								variant="contained"
								color="secondary"
								onClick={handleClick}
								>
							Add
							</Button>
								</Grid>
							</Grid>
							<ArtistTable/>
							</Paper>
						</Grid>
		</Grid>
		</Container>
	)
}


export default Artist;
