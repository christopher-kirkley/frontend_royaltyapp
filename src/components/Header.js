import React from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'

import SettingsIcon from '@material-ui/icons/Settings';

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

	return (
			<div style={{marginBottom: 90}}>
			<AppBar position="absolute" className={(classes.appBar, classes.appBarShift)}>
				<Toolbar>
					<Typography id="header" component="h1" variant="h6" color="inherit" noWrap style={{flexGrow: 1}}>
					{props.name}
					</Typography>
		{
					// <IconButton color="inherit">
					// 	<SettingsIcon/>
					// </IconButton>
		}
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header


