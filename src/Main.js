import React, { Component } from "react";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from "react-router-dom";

import Artists from "./artists/Artists"
import ArtistDetail from "./artists/ArtistDetail"
import Test from "./Test";
import Button from '@material-ui/core/Button';

import { makeStyles } from "@material-ui/core/styles"
import { 
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography 
} from "@material-ui/core"

import AppBar from '@material-ui/core/AppBar';

import HomeIcon from "@material-ui/icons/Home"
import PeopleIcon from "@material-ui/icons/People"
import AlbumIcon from '@material-ui/icons/Album'

const useStyles = makeStyles((theme) => ({
		drawerPaper: { width: 'inherit' },
		link: {
						textDecoration: 'none',
						color: theme.palette.text.primary
					}
}))

function Main() {
	const classes= useStyles()
	return (
		<Router>
		<div style={{ display: 'flex' }}>
			<Drawer
				style={{ width: '220px' }}
				variant="persistent"
				anchor="left"
				open={true}
				classes={{ paper: classes.drawerPaper}}
			>
				<List>
					<ListItem>
						<Typography variant="h6" align='center'>
							RoyaltyApp V4.0
						</Typography>
					</ListItem>
					<hr/>
					<Link to="/" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary={"Dashboard"}/>
					</ListItem>
					</Link>
					<Link to="/artists" className={classes.link}>
					<ListItem button id="artists">
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary={"Artists"}/>
					</ListItem>
					</Link>
				</List>
			</Drawer>
			<Switch>
				<Route path="/artists" component={Artists}/>
				<Route path="/artist/:id" component={ArtistDetail}/>
			</Switch>
		</div>
		{
			// <ul className="header">
			// 	<li><Link to="/">Dashboard</NavLink></li>
			// 	<li><Link to="/artist" id="artist">Artist</NavLink></li>
			// </ul>
		}
		<div className="content">
		</div>
	</Router>
	)
}

export default Main;
