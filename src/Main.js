import React, { useState, useContext } from "react";
import Cookies from "js-cookie";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from "react-router-dom";

import ApiStore from './ApiStore';

import Home from "./home/Home"
import Login from "./home/Login"

import Dashboard from "./dashboard/Dashboard"

import Artists from "./artists/Artists"
import ArtistAdd from "./artists/ArtistAdd"
import ArtistDetail from "./artists/ArtistDetail"

import Catalog from "./catalog/Catalog"
import CatalogAdd from "./catalog/CatalogAdd"
import CatalogDetail from "./catalog/CatalogDetail"
import Import from "./catalog/Import"

import Bundle from "./bundle/Bundle"
import BundleAdd from "./bundle/BundleAdd"
import BundleDetail from "./bundle/BundleDetail"
import BundleImport from "./bundle/BundleImport"

import Income from "./income/Income"
import IncomeImport from "./income/IncomeImport"
import IncomeAdd from "./income/IncomeAdd"
import MatchingErrors from "./income/MatchingErrors"

import ArtistMatchingErrors from "./expense/ArtistMatchingErrors"
import CatalogMatchingErrors from "./expense/CatalogMatchingErrors"
import TypeMatchingErrors from "./expense/TypeMatchingErrors"

import TrackMatchingErrors from "./income/TrackMatchingErrors"
import RefundMatchingErrors from "./income/RefundMatchingErrors"
import ImportedIncome from "./income/ImportedIncome"
import DetailImportedIncome from "./income/DetailImportedIncome"
import Statement from "./statements/Statement"
import StatementGenerate from "./statements/StatementGenerate"
import StatementView from "./statements/StatementView"
import StatementSummary from "./statements/StatementSummary"
import StatementEdit from "./statements/StatementEdit"
import StatementDetail from "./statements/StatementDetail"

import Settings from "./settings/Settings"
import OpeningBalanceFix from "./settings/OpeningBalanceFix"

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import DescriptionIcon from '@material-ui/icons/Description';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewListIcon from '@material-ui/icons/ViewList';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsIcon from '@material-ui/icons/Settings';

import Expense from "./expense/Expense"
import ExpenseImport from "./expense/ExpenseImport"
import ExpenseMatchingErrors from "./expense/ExpenseMatchingErrors"
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
import BundleIcon from '@material-ui/icons/ViewList'
import IncomeIcon from '@material-ui/icons/AttachMoney'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

import { SessionContext } from './hooks/SessionContext'

import history from './hooks/history'

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


	const { session, setSession } = useContext(SessionContext)

	function handleLogout() {
		let data = Cookies.get('session')
		if (data) {
			fetch('http://localhost:5000/logout',
				{credentials: 'include', method: 'POST'}
			)
		}
		setSession(false)
	}

	function isAuthenticated() {
		let data = Cookies.get('session')
		if (data == 'true') {
			setSession(true)
			return true
		}
		else {
			handleLogout()
			return false
		}
	}

	setInterval(() => {
		isAuthenticated()
	}, 3000)


	const ProtectedRoute = ({isEnabled, ...props}) => {
    return (isEnabled) ? <Route {...props} /> : <Redirect to="/"/>;
	};

	return (
		<ApiStore>
		<ThemeProvider theme={theme}>
		<Router >
		<div style={{ display: 'flex' }}>
		{ session ?
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

					<Link to="/dashboard" className={classes.link}>
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

				<Link to="/bundle" className={classes.link}>
					<ListItem button id="bundle">
						<ListItemIcon>
							<BundleIcon />
						</ListItemIcon>
						<ListItemText primary={"Bundle"}/>
					</ListItem>
				</Link>

				<Link to="/income" className={classes.link}>
					<ListItem button id="income">
						<ListItemIcon>
							<IncomeIcon />
						</ListItemIcon>
						<ListItemText primary={"Income"}/>
					</ListItem>
				</Link>

				<Link to="/expense" className={classes.link}>
					<ListItem button id="expense">
						<ListItemIcon>
							<MoneyOffIcon />
						</ListItemIcon>
						<ListItemText primary={"Expense"}/>
					</ListItem>
				</Link>

				<Link to="/statements" className={classes.link}>
					<ListItem button id="statements">
						<ListItemIcon>
							<DescriptionIcon />
						</ListItemIcon>
						<ListItemText primary={"Statement"}/>
					</ListItem>
				</Link>
				
				<Divider />

				<Link to="/settings" className={classes.link}>
					<ListItem button id="settings">
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={"Settings"}/>
					</ListItem>
				</Link>


				</List>
			</Drawer>
			:
			null
		}
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
				<ProtectedRoute exact path="/dashboard" component={Dashboard} isEnabled={isAuthenticated()}/>
				<ProtectedRoute exact path="/artists" component={Artists} isEnabled={isAuthenticated()}/>
				<ProtectedRoute exact path="/artist/add" component={ArtistAdd} isEnabled={isAuthenticated()}/>
				<ProtectedRoute exact path="/artist/:id" component={ArtistDetail} isEnabled={isAuthenticated()}/>
				<ProtectedRoute exact path="/catalog" component={Catalog} isEnabled={isAuthenticated()}/>
				<Route exact path="/catalog/add" component={CatalogAdd}/>
				<Route exact path="/catalog/import" component={Import}/>
				<Route exact path="/catalog/:id" component={CatalogDetail}/>
				<Route exact path="/bundle" component={Bundle}/>
				<Route exact path="/bundle/add" component={BundleAdd}/>
				<Route exact path="/bundle/import" component={BundleImport}/>
				<Route exact path="/bundle/:id" component={BundleDetail}/>
				<Route exact path="/income" component={Income}/>
				<Route exact path="/income/add" component={IncomeAdd}/>
				<Route exact path="/income/import" component={IncomeImport}/>
				<Route exact path="/income/matching-errors" component={MatchingErrors}/>
				<Route exact path="/income/track-matching-errors" component={TrackMatchingErrors}/>
				<Route exact path="/income/refund-matching-errors" component={RefundMatchingErrors}/>
				<Route exact path="/income/:id" component={DetailImportedIncome}/>
				<Route exact path="/expense" component={Expense}/>
				<Route exact path="/expense/import" component={ExpenseImport}/>
				<Route exact path="/expense/artist-matching-errors" component={ArtistMatchingErrors}/>
				<Route exact path="/expense/catalog-matching-errors" component={CatalogMatchingErrors}/>
				<Route exact path="/expense/type-matching-errors" component={TypeMatchingErrors}/>
				<Route exact path="/expense/:id" component={DetailImportedExpense}/>
				<Route exact path="/statements" component={Statement}/>
				<Route exact path="/statements/generate" component={StatementGenerate}/>
				<Route exact path="/statements/view" component={StatementView}/>
				<Route exact path="/statements/:id" component={StatementSummary}/>
				<Route exact path="/statements/:id/edit" component={StatementEdit}/>
				<Route exact path="/statements/:id/artist/:artistId" component={StatementDetail}/>
				<Route exact path="/settings" component={Settings}/>
				<Route exact path="/settings/opening-balance-fix" component={OpeningBalanceFix}/>
			</Switch>
		</div>

		<div className="content">
		</div>

	</Router>
		</ThemeProvider>
		</ApiStore>
	)
}

export default Main;
