import React from 'react'

import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';

function PendingImports(props) {

	const history = useHistory()

	const pendingList = props.pendingStatements.map((pendingStatement, index) =>
		{
			return (
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<DescriptionIcon/>
						</Avatar>
					</ListItemAvatar>
					<ListItemText
					  primary={pendingStatement.statement}
						id="pending_statement"
					/>
						<IconButton
							id={`delete-${index}`}
							name="pending_statement"
							value={pendingStatement.statement}
							edge="end"
							aria-label="delete"
							onClick={() => props.handleDelete(pendingStatement.statement)}
						>
							<DeleteIcon/>
						</IconButton>
				</ListItem>
			)
	})

	function DisplayMatchingErrors() {
		if (props.matchingErrors > 0 && props.pendingStatements.length > 0) {
			return (
				<Alert severity="warning">
					<AlertTitle>Matching Errors</AlertTitle>
				  <span id="matching_errors">You have <strong id="error_number">{props.matchingErrors}</strong> matching errors.</span>
				<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
				</Alert>
			)
		}
		if (props.matchingErrors == 0 && props.pendingStatements.length > 0) {
			return (
				<Alert severity="success">
					<AlertTitle>Ready to Process!</AlertTitle>
				</Alert>
			)
		}
		return null
	}


	return (
		<React.Fragment>
		<Typography color="textSecondary" component="h2" variant="h5" align="center" gutterBottom>
		 Pending Imports
		</Typography>
		<Grid container alignItems="center" justify="center" spacing={2}>
			<Grid item xs={7}>
			{ props.pendingStatements.length > 0 ?
				<List>
					{pendingList}
				</List>
				:
				<Typography align="center">No data</Typography>
			}
			</Grid>
			<Grid item xs={7}>
				<DisplayMatchingErrors/>
			</Grid>
		</Grid>
		<Grid container justify="center" spacing={2}>
			<Grid item xs={2}>
				<Button
					variant="contained"
					color="primary"
					id="process_errors"
					name="process_errors"
					type="submit"
					fullWidth
					onClick={props.processPending}
					disabled={ props.matchingErrors > 0 || props.pendingStatements.length === 0 ? true : false }
				>Process</Button>
			</Grid>
			<Grid item xs={2}>
				<Button
					variant="contained"
					color="primary"
					id="fix_errors"
					name="submit"
					type="submit"
					fullWidth
					onClick={props.goToMatchingErrorPage}	
					disabled={ props.matchingErrors > 0 || props.pendingStatements.length === 0 ? false : true }
				>Fix</Button>
			</Grid>
		</Grid>
		</React.Fragment>
	)
}

export default PendingImports

