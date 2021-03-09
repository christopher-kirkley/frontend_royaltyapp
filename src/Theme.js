import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	shadows: ["none"],
	overrides: {
		MuiPaper: {
			background: "#808080"
		},
	},
})


export default theme;

