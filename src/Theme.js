import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles"

const theme = createMuiTheme({
	  overrides: {
			    MuiButton: {
						size: 'small', // this prop disables the drop shadow on all Buttons
						    },
					MuiPaper: {
						elevation: 10,
						root: {
							padding: 10
						}
					}
			  },
})

theme.props = {
	// MuiButton: { // `MuiButton` is the global class name for the <Button /> component
	// 	size: 'small', // this prop disables the drop shadow on all Buttons
	// 	root: {
	// 						fontSize: '30rem',
	// 	}
	// },
	MuiPaper: {
		elevation: 10,
	}
}


export default theme;

