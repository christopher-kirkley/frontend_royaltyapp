import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'

import SettingsIcon from '@material-ui/icons/Settings';

import { useHistory } from 'react-router-dom'

import { SessionContext } from '../hooks/SessionContext'

const drawerWidth = 220

const useStyles = makeStyles((theme) => ({
	  appBar: {
			    zIndex: theme.zIndex.drawer + 1,
			    transition: theme.transitions.create(['width', 'margin'], {
						      easing: theme.transitions.easing.sharp,
						      duration: theme.transitions.duration.leavingScreen,
						    }),
			  },
	  appBarShift: {
			    marginLeft: drawerWidth,
			    width: `calc(100% - ${drawerWidth}px)`,
			    transition: theme.transitions.create(['width', 'margin'], {
						      easing: theme.transitions.easing.sharp,
						      duration: theme.transitions.duration.enteringScreen,
						    }),
		},
}))


function Header(props) {

	const classes = useStyles();

	const history = useHistory();

	const { session, setSession } = useContext(SessionContext)

	function handleLogout() {
		fetch('http://localhost:5000/logout', {
			method: 'POST',
				})
		.then(res => res.json())
		.then(res => history.push('/'))
		.then(json => setSession(false))
	}

	return (
			<div style={{marginBottom: 90}}>
			<AppBar position="absolute" className={(classes.appBar, classes.appBarShift)}>
				<Toolbar>
				<Grid container alignItems="center" justify="space-around" spacing={3}>
					<Grid item>
							<Typography id="header" component="h1" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
							{props.name}
							</Typography>
				{
							// <IconButton color="inherit">
							// 	<SettingsIcon/>
							// </IconButton>
				}
					</Grid>
					<Grid item>
						<Button
							id="logout"
							onClick={handleLogout}
						>
						Logout
						</Button>
					</Grid>
				</Grid>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header


