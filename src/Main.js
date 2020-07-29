import React from "react";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from "react-router-dom";

import Artists from "./artists/Artists"
import ArtistDetail from "./artists/ArtistDetail"

import Catalog from "./catalog/Catalog"
import CatalogItem from "./catalog/CatalogItem"
import Import from "./catalog/Import"

import Income from "./income/Income"
import MatchingErrors from "./income/MatchingErrors"
import ImportedIncome from "./income/ImportedIncome"


import { makeStyles } from "@material-ui/core/styles"
import { 
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography 
} from "@material-ui/core"


import HomeIcon from "@material-ui/icons/Home"
import PeopleIcon from "@material-ui/icons/People"
import CatalogIcon from '@material-ui/icons/Album'
import IncomeIcon from '@material-ui/icons/AttachMoney'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

const useStyles = makeStyles((theme) => ({
		drawerPaper: { width: 'inherit' },
		link: {
						textDecoration: 'none',
						color: theme.palette.text.primary
					},
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
}))


function Main() {
	const classes= useStyles()
	return (
		<Router >
		<div style={{ display: 'flex' }}>
			<Drawer
				style={{ width: '220px' }}
				variant="persistent"
				anchor="left"
				open={true}
				classes={{ paper: classes.drawerPaper}}
			>
				<List className={classes.root}>
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
					<Link to="/catalog" className={classes.link}>
						<ListItem button id="catalog">
							<ListItemIcon>
								<CatalogIcon />
							</ListItemIcon>
							<ListItemText primary={"Catalog"}/>
						</ListItem>
					</Link>
					<Link to="/income" className={classes.link}>
						<ListItem button id="income">
							<ListItemIcon>
								<IncomeIcon />
							</ListItemIcon>
							<ListItemText primary={"Income"}/>
						</ListItem>
							<List component="div" disablePadding>
							<Link to="/income/view-imported" className={classes.link}>
								<ListItem button id="view_imported_income" className={classes.nested}>
									<ListItemIcon>
										<ViewAgendaIcon />
									</ListItemIcon>
									<ListItemText primary={"View Imported"}/>
								</ListItem>
							</Link>
							</List>
					</Link>
				</List>
			</Drawer>
			<Switch>
				<Route exact path="/artists" component={Artists}/>
				<Route exact path="/artist/add" component={ArtistDetail}/>
				<Route exact path="/artist/:id" component={ArtistDetail}/>
				<Route exact path="/catalog" component={Catalog}/>
				<Route exact path="/catalog/add" component={CatalogItem}/>
				<Route exact path="/catalog/import" component={Import}/>
				<Route exact path="/catalog/:id" component={CatalogItem}/>
				<Route exact path="/income" component={Income}/>
				<Route exact path="/income/matching-errors" component={MatchingErrors}/>
				<Route exact path="/income/view-imported" component={ImportedIncome}/>
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
