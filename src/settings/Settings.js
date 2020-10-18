import React from 'react';

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
	}

	return (
		<Container>
		<Header name="Settings"/>
		<Grid container direction="row" >
			<Grid item xs={12}>
				<Paper className={classes.paper}> 
				</Paper>
			</Grid>
		</Grid>
		</Container>
	)
}


export default Artist;
