import React, { useState, useEffect } from 'react';

import AddArtist from "./AddArtist";
import ArtistTable from "./ArtistTable";

import { Redirect } from 'react-router-dom'
import {
	NavLink
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles';

function Artist() {

	const history = useHistory();

	const [addArtist, setAddArtist] = useState(false)

	function handleClick() {
		setAddArtist(true)
	}

		return (
			<Container>
				<AppBar position="static">
					<Toolbar variant="dense">
						<Typography variant="h6" color="inherit">
						Artists
						</Typography>
					</Toolbar>
				</AppBar>
				<div>
					{
						addArtist ?
						<AddArtist onChange={() => setAddArtist(false)}/>
						:
						<Grid container spacing={3}>
							<Grid item xs={8}>
								<ArtistTable/>
							</Grid>
							<Grid item xs={4} align="right">
								<br/>
								<Button variant="contained" color="primary" id="add_artist" onClick={handleClick}>
								Add Artist
								</Button>
							</Grid>
						</Grid>
					}
				</div>
			</Container>
		)
	}

	
	

export default Artist;
