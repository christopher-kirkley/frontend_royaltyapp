import React from 'react';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

function ConditionalButton(props) {

	return (
		<Grid container spacing={2} style={{marginTop: 3}}>
			<Grid item xs={4}>
			<Button 
				onClick={props.handleClick}
				variant="contained"
				color="primary"
				id="edit"
				fullWidth
				disabled={ props.edit ? true : false }
				>
				Edit
			</Button>
			</Grid>
			<Grid item xs={4}>
			<Button 
				type="submit"
				variant="contained"
				color="primary"
				id="submit"
				form={props.form}
				fullWidth
				disabled={ props.edit ? false : true }
				>
				Update
			</Button>
			</Grid>
		</Grid>
	
	)

}

export default ConditionalButton


