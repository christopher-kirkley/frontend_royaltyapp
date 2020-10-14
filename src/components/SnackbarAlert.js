import React from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 220


function SnackbarAlert(props) {

	return (
		<div>
			<Snackbar open={props.success}
				autoHideDuration={1500}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				onClose={()=>props.setSuccess(false)}
			>
				<Alert severity="success">
				Uploaded!
				</Alert>
			</Snackbar>

			<Snackbar open={props.error}
				autoHideDuration={1500}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				onClose={()=>props.setError(false)}
			>
				<Alert severity="error">
				Error
				</Alert>
			</Snackbar>
		</div>
	)
}

export default SnackbarAlert
