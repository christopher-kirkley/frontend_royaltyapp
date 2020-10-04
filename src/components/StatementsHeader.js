import React from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function StatementsHeader(props) {

	return (
					<Grid container spacing={1} item xs={3} >
						<Grid item >
							<Button
								id="add_income"
								size="small"
								variant="contained"
								color="secondary"
								onClick={props.handleAdd}
								>
							Add
							</Button>
						</Grid>
						<Grid item xs={1}>
							<Button
								id="import_income"
								size="small"
								variant="contained"
								onClick={props.handleImport}
								>
							Import
							</Button>
						</Grid>
					</Grid>
	)
}

export default StatementsHeader


