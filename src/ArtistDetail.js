import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import AddArtist from "./AddArtist";
import {
	NavLink
} from "react-router-dom";
import { useHistory } from "react-router-dom";


function ArtistDetail () {

	return (
			<div>
				<h1 id="heading">Artist Detail</h1>
				<table id="artist_table">
					<thead>
						<tr>
							<th>Artist Name</th>
							<th>Prenom</th>
							<th>Surnom</th>
						</tr>
					</thead>
				</table>
		</div>
	)}



export default ArtistDetail;
