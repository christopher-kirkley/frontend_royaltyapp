import React, { useState, useEffect } from 'react';

import AddArtist from "./AddArtist";
import ArtistTable from "./ArtistTable";

import { Redirect } from 'react-router-dom'
import {
	NavLink
} from "react-router-dom";
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

function Artist() {

	const history = useHistory();

	const [addArtist, setAddArtist] = useState(false)

	function handleClick() {
		setAddArtist(true)
	}

		return (
			<div className="component">
				<h1 id="header">Artists Page</h1>
				{addArtist ?
					<AddArtist onChange={() => setAddArtist(false)}/>
					:
					<div>
					<Button variant="contained" color="primary" id="add_artist" onClick={handleClick}>
					Add Artist
					</Button>
					<ArtistTable/>
					</div>
				}
			</div>
		)
	}

	
	

export default Artist;
