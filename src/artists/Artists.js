import React from 'react';

import AddArtist from "./AddArtist";
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

import { makeStyles } from '@material-ui/core/styles';

function Artist() {

	const history = useHistory();

	function handleClick() {
		history.push('/artist/add')
	}

		return (
			<Container>
				<Header name="Artists"/>
				<div>
						<Grid container spacing={2} direction="row"
							alignItems="center"
							
							style={{marginTop: 1}}>
							<Grid item xs={7} container> 
								<Grid item xs={12}>
								<Paper elevation={10}>
								<ArtistTable/>
								</Paper>
							</Grid>
							</Grid>
							<Grid item>
								<Button variant="contained" color="primary" id="add_artist" onClick={handleClick}>
								Add Artist
								</Button>
							</Grid>
						</Grid>
				</div>
			</Container>
		)
	}


export default Artist;
