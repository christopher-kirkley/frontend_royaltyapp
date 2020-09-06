import React, { useState } from "react";

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
import DetailImportedIncome from "./income/DetailImportedIncome"
import StatementGenerate from "./statements/StatementGenerate"
import StatementView from "./statements/StatementView"
import StatementSummary from "./statements/StatementSummary"
import StatementEdit from "./statements/StatementEdit"
import StatementDetail from "./statements/StatementDetail"

import Collapse from '@material-ui/core/Collapse';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import DescriptionIcon from '@material-ui/icons/Description';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import Expense from "./expense/Expense"
import ExpenseMatchingErrors from "./expense/ExpenseMatchingErrors"
import ImportedExpense from "./expense/ImportedExpense"
import DetailImportedExpense from "./expense/DetailImportedExpense"
import ImportedExpenseTable from "./expense/DetailImportedExpenseTable"


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
	const classes = useStyles()

	const [open, setOpen] = useState(false)

	function handleClick() {
		setOpen(!open)
	}

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
							{ open ? <ExpandLess /> : <ExpandMore />}
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

					<ListItem button id="income" onClick={handleClick}>
						<ListItemIcon>
							<IncomeIcon />
						</ListItemIcon>
						<ListItemText primary={"Income"}/>
						{ open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						<Link to="/income" className={classes.link}>
							<ListItem button id="import_income" className={classes.nested}>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText primary={"Import Income"}/>
							</ListItem>
						</Link>
						<Link to="/income/view-imported" className={classes.link}>
							<ListItem button id="view_imported_income" className={classes.nested}>
								<ListItemIcon>
									<ViewAgendaIcon />
								</ListItemIcon>
								<ListItemText primary={"View Imported"}/>
							</ListItem>
						</Link>
						</List>
					</Collapse>

					<ListItem button id="expense" onClick={handleClick}>
						<ListItemIcon>
							<MoneyOffIcon />
						</ListItemIcon>
						<ListItemText primary={"Expense"}/>
						{ open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						<Link to="/expense" className={classes.link}>
							<ListItem button id="import_expense" className={classes.nested}>
								<ListItemIcon>
									<AddIcon />
								</ListItemIcon>
								<ListItemText primary={"Import Expense"}/>
							</ListItem>
						</Link>
						<Link to="/expense/view-imported-expense" className={classes.link}>
							<ListItem button id="view_imported_expense" className={classes.nested}>
								<ListItemIcon>
									<ViewAgendaIcon />
								</ListItemIcon>
								<ListItemText primary={"View Imported"}/>
							</ListItem>
						</Link>
						</List>
					</Collapse>

					<ListItem button id="statement" onClick={handleClick}>
						<ListItemIcon>
							<DescriptionIcon />
						</ListItemIcon>
						<ListItemText primary={"Statement"}/>
						{ open ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
		      <Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						<Link to="/statements/generate" className={classes.link}>
							<ListItem button id="statements_generate" className={classes.nested}>
							<ListItemIcon>
								<AddCircleIcon />
							</ListItemIcon>
							<ListItemText primary={"Generate"}/>
							</ListItem>
						</Link>
						<Link to="/statements/view" className={classes.link}>
							<ListItem button id="statements_view" className={classes.nested}>
								<ListItemIcon>
									<FindInPageIcon />
								</ListItemIcon>
								<ListItemText primary={"View"}/>
							</ListItem>
						</Link>
						</List>
					</Collapse>

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
				<Route exact path="/income/:id" component={DetailImportedIncome}/>
				<Route exact path="/expense" component={Expense}/>
				<Route exact path="/expense/matching-errors" component={ExpenseMatchingErrors}/>
				<Route exact path="/expense/view-imported-expense" component={ImportedExpense}/>
				<Route exact path="/expense/:id" component={DetailImportedExpense}/>
				<Route exact path="/statements/generate" component={StatementGenerate}/>
				<Route exact path="/statements/view" component={StatementView}/>
				<Route exact path="/statements/:id" component={StatementSummary}/>
				<Route exact path="/statements/:id/edit" component={StatementEdit}/>
				<Route exact path="/statements/:id/artist/:artistId" component={StatementDetail}/>
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
