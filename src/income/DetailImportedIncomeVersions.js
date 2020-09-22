import React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function DetailImportedIncomeVersions(props) {

	return (
		<Container component={Paper}>
		<div style={{marginTop: 20,
								padding: 10,
								display: "flex", flexDirection: "column",
								alignItems:"center", border: '3px solid black'}}>
				<Typography component="h2" variant="h5">
					{props.type} versions
				</Typography>
					<Table>
					<TableRow>
						<TableCell>Version Number</TableCell>
						<TableCell>Quantity</TableCell>
						<TableCell>Sum</TableCell>
					</TableRow>
				{props.versions.map((version) =>
					<TableRow>
						<TableCell>{version.version_number}</TableCell>
						<TableCell>{version.quantity}</TableCell>
						<TableCell>{version.amount}</TableCell>
					</TableRow>
				)
				}
				</Table>
		</div>
		</Container>
		);
}


export default DetailImportedIncomeVersions
