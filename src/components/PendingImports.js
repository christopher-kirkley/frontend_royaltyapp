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
		if (props.pendingStatements.length > 0) {
			return (
				<React.Fragment>
				{ props.matchingErrors > 0
					&&
					<Grid container alignItems="center">
						<Grid item xs={11}>
							<Alert severity="warning">
								<AlertTitle>UPC Matching Errors</AlertTitle>
								<span id="upc_matching_errors">You have <strong id="error_number">{props.matchingErrors}</strong> UPC matching errors.</span>
							<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
							</Alert>
						</Grid>
						<Grid item xs={1}>
							<Button
								color="secondary"
								variant="contained"
								onClick={props.goToMatchingErrorPage}	
								id="fix_upc_errors"
								>Fix</Button>
						</Grid>
					</Grid>
				}

				{ props.trackMatchingErrors > 0
					&&
					<Grid container alignItems="center">
						<Grid item xs={11}>
							<Alert severity="warning">
								<AlertTitle>ISRC Matching Errors</AlertTitle>
										<span id="isrc_matching_errors">You have <strong id="error_number">{props.trackMatchingErrors}</strong> ISRC matching errors.</span>
									<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
							</Alert>
						</Grid>
						<Grid item xs={1}>
							<Button
								color="secondary"
								id="fix_isrc_errors"
								variant="contained"
								onClick={()=>history.push('/income/track-matching-errors')}	
								>Fix</Button>
						</Grid>
					</Grid>
				}

				{ props.artistMatchingErrors > 0
					&&
					<Grid container alignItems="center">
						<Grid item xs={11}>
							<Alert severity="warning">
								<AlertTitle>Artist Matching Errors</AlertTitle>
										<span id="artist_matching_errors">You have <strong id="error_number">{props.artistMatchingErrors}</strong> artist matching errors.</span>
									<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
							</Alert>
						</Grid>
						<Grid item xs={1}>
							<Button
								color="secondary"
								id="fix_artist_errors"
								variant="contained"
								onClick={()=>history.push('/expense/artist-matching-errors')}	
								>Fix</Button>
						</Grid>
					</Grid>
				}

				{ props.typeMatchingErrors > 0
					&&
					<Grid container alignItems="center">
						<Grid item xs={11}>
							<Alert severity="warning">
								<AlertTitle>Type Matching Errors</AlertTitle>
										<span id="type_matching_errors">You have <strong id="error_number">{props.typeMatchingErrors}</strong> type matching errors.</span>
									<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
							</Alert>
						</Grid>
						<Grid item xs={1}>
							<Button
								color="secondary"
								id="fix_type_errors"
								variant="contained"
								onClick={()=>history.push('/expense/type-matching-errors')}	
								>Fix</Button>
						</Grid>
					</Grid>
				}

				{ props.catalogMatchingErrors > 0
					&&
					<Grid container alignItems="center">
						<Grid item xs={11}>
							<Alert severity="warning">
								<AlertTitle>Catalog Matching Errors</AlertTitle>
										<span id="catalog_matching_errors">You have <strong id="error_number">{props.catalogMatchingErrors}</strong> catalog matching errors.</span>
									<Typography component="p" variant="p" id="error_msg">{props.matchingErrorsMsg}</Typography>
							</Alert>
						</Grid>
						<Grid item xs={1}>
							<Button
								color="secondary"
								id="fix_catalog_errors"
								variant="contained"
								onClick={()=>history.push('/expense/catalog-matching-errors')}	
								>Fix</Button>
						</Grid>
					</Grid>
				}

				</React.Fragment>
			)
		}
		if (props.matchingErrors == 0 | props.trackMatchingErrors === 0 && props.pendingStatements.length > 0) {
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
					disabled={ props.matchingErrors > 0 || props.trackMatchingErrors > 0 || props.pendingStatements.length === 0 ? true : false }
				>Process</Button>
			</Grid>
		</Grid>
		</React.Fragment>
	)
}

export default PendingImports

