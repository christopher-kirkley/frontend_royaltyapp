import React, { useState } from "react";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from "react-router-dom";

import Artists from "./artists/Artists"
import ArtistDetail from "./artists/ArtistDetail"

import ViewCatalog from "./catalog/ViewCatalog"
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewListIcon from '@material-ui/icons/ViewList';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import Expense from "./expense/Expense"
import ExpenseMatchingErrors from "./expense/ExpenseMatchingErrors"
import ImportedExpense from "./expense/ImportedExpense"
import DetailImportedExpense from "./expense/DetailImportedExpense"
import ImportedExpenseTable from "./expense/DetailImportedExpenseTable"

import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./Theme"



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



function Main() {
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

	const classes = useStyles()

	const [openArtist, setOpenArtist] = useState(false)
	const [openCatalog, setOpenCatalog] = useState(false)
	const [openIncome, setOpenIncome] = useState(false)
	const [openExpense, setOpenExpense] = useState(false)
	const [openStatement, setOpenStatement] = useState(false)


	function handleOpenArtist() {
		setOpenArtist(!openArtist)
	}

	function handleOpenCatalog() {
		setOpenCatalog(!openCatalog)
	}

	function handleOpenIncome() {
		setOpenIncome(!openIncome)
	}

	function handleOpenExpense() {
		setOpenExpense(!openExpense)
	}

	function handleOpenStatement() {
		setOpenStatement(!openStatement)
	}


	return (
		<ThemeProvider theme={theme}>
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

					<ListItem button id="artists" onClick={handleOpenArtist}>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary={"Artists"}/>
						{ openCatalog ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openArtist} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<Link to="/artist/add" className={classes.link}>
								<ListItem button id="add_artist" className={classes.nested}>
								<ListItemIcon>
									<AddCircleIcon />
								</ListItemIcon>
								<ListItemText primary={"Add Artist"}/>
							</ListItem>
							</Link>
							<Link to="/artists" className={classes.link}>
								<ListItem button id="view_artists" className={classes.nested}>
								<ListItemIcon>
									<ViewListIcon />
								</ListItemIcon>
								<ListItemText primary={"View Artists"}/>
							</ListItem>
							</Link>
						</List>
					</Collapse>

					<ListItem button id="catalog" onClick={handleOpenCatalog}>
						<ListItemIcon>
							<CatalogIcon />
						</ListItemIcon>
						<ListItemText primary={"Catalog"}/>
						{ openCatalog ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openCatalog} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<Link to="/catalog/add" className={classes.link}>
								<ListItem button id="add_catalog" className={classes.nested}>
								<ListItemIcon>
									<AddCircleIcon />
								</ListItemIcon>
								<ListItemText primary={"Add"}/>
							</ListItem>
							</Link>
							<Link to="/catalog" className={classes.link}>
								<ListItem button id="view_catalog" className={classes.nested}>
								<ListItemIcon>
									<ViewListIcon />
								</ListItemIcon>
								<ListItemText primary={"View"}/>
							</ListItem>
							</Link>
							<Link to="/catalog/import" className={classes.link}>
								<ListItem button id="catalog" className={classes.nested}>
								<ListItemIcon>
									<ImportExportIcon />
								</ListItemIcon>
								<ListItemText primary={"Import"}/>
							</ListItem>
							</Link>
						</List>
					</Collapse>

					<ListItem button id="income" onClick={handleOpenIncome}>
						<ListItemIcon>
							<IncomeIcon />
						</ListItemIcon>
						<ListItemText primary={"Income"}/>
						{ openIncome ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openIncome} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						<Link to="/income" className={classes.link}>
							<ListItem button id="import_income" className={classes.nested}>
								<ListItemIcon>
									<AddCircleIcon />
								</ListItemIcon>
								<ListItemText primary={"Import Income"}/>
							</ListItem>
						</Link>
						<Link to="/income/view-imported" className={classes.link}>
							<ListItem button id="view_imported_income" className={classes.nested}>
								<ListItemIcon>
									<ViewListIcon />
								</ListItemIcon>
								<ListItemText primary={"View Imported"}/>
							</ListItem>
						</Link>
						</List>
					</Collapse>

					<ListItem button id="expense" onClick={handleOpenExpense}>
						<ListItemIcon>
							<MoneyOffIcon />
						</ListItemIcon>
						<ListItemText primary={"Expense"}/>
						{ openExpense ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={openExpense} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						<Link to="/expense" className={classes.link}>
							<ListItem button id="import_expense" className={classes.nested}>
								<ListItemIcon>
									<AddCircleIcon />
								</ListItemIcon>
								<ListItemText primary={"Import Expense"}/>
							</ListItem>
						</Link>
						<Link to="/expense/view-imported-expense" className={classes.link}>
							<ListItem button id="view_imported_expense" className={classes.nested}>
								<ListItemIcon>
									<ViewListIcon />
								</ListItemIcon>
								<ListItemText primary={"View Imported"}/>
							</ListItem>
						</Link>
						</List>
					</Collapse>

					<ListItem button id="statement" onClick={handleOpenStatement}>
						<ListItemIcon>
							<DescriptionIcon />
						</ListItemIcon>
						<ListItemText primary={"Statement"}/>
						{ openStatement ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
		      <Collapse in={openStatement} timeout="auto" unmountOnExit>
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
									<ViewListIcon />
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
				<Route exact path="/catalog" component={ViewCatalog}/>
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
		<div className="content">
		</div>
	</Router>
		</ThemeProvider>
	)
}

export default Main;
