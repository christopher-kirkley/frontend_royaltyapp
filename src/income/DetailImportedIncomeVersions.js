import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function DetailImportedIncomeVersions(props) {

	return (
		<div>
			<Typography style={{textTransform: 'capitalize'}} color="textSecondary" align="center" component="h2" variant="h5" gutterBottom>
		{props.type}
			</Typography>
					<Table size="small">
					<TableRow>
						<TableCell>Item</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Sum</TableCell>
					</TableRow>
				{
					props.versions.map((version) =>
					<TableRow>
						{ 
							props.type =='bundles' ?
						<TableCell>{version.bundle_number}</TableCell>
							:
							props.type == 'tracks' ?
						<TableCell>{version.track_name}</TableCell>
							:
						<TableCell>{version.version_number}</TableCell>
						
							}
						<TableCell>{version.quantity}</TableCell>
						<TableCell>{version.amount}</TableCell>
					</TableRow>
				)
				}
				</Table>
		</div>
		);
}


export default DetailImportedIncomeVersions
