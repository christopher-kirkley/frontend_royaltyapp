import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import NativeSelect from '@material-ui/core/NativeSelect';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
	active: {
		backgroundColor: "#ff6700"
	},
	root: {
				flexShrink: 0,
				marginLeft: theme.spacing(2.5),
			},
}))

function TablePaginationActions(props) {
	  const classes = useStyles();
	  const theme = useTheme();
		const { count, page, rowsPerPage, onChangePage } = props;

		const handleFirstPageButtonClick = (event) => {
					onChangePage(event, 0);
				};

		const handleBackButtonClick = (event) => {
					onChangePage(event, page - 1);
				};

		const handleNextButtonClick = (event) => {
					onChangePage(event, page + 1);
				};

		const handleLastPageButtonClick = (event) => {
					onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
				};

	  return (
			    <div className={classes.root}>
			      <IconButton
			        onClick={handleFirstPageButtonClick}
			        disabled={page === 0}
			        aria-label="first page"
			      >
			        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			      </IconButton>
			      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
			        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			      </IconButton>
			      <IconButton
			        onClick={handleNextButtonClick}
			        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			        aria-label="next page"
			      >
			        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			      </IconButton>
			      <IconButton
			        onClick={handleLastPageButtonClick}
			        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			        aria-label="last page"
			      >
			        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			      </IconButton>
			    </div>
			  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function MatchingTable(props) {

	const history = useHistory()
	
	const classes = useStyles()

	const [ msg, setMsg ] = useState('')
	const [upcs, setUpcs] = useState([])


	useEffect(() => {
		fetch('http://localhost:5000/version')
		.then(res => res.json())
		.then(json => setUpcs(json))
		.catch(res => setMsg('Error fetching data'))
	}, [])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.version_number} : {upc.upc}
				</option>
			)
	})

	const [distributorChecked, setDistributorChecked] = useState(false)
	const [upcChecked, setUpcChecked] = useState(false)
	const [versionNumberChecked, setVersionNumberChecked] = useState(false)
	const [descriptionChecked, setDescriptionChecked] = useState(false)
	const [catalogChecked, setCatalogChecked] = useState(false)
	const [mediumChecked, setMediumChecked] = useState(false)
	const [typeChecked, setTypeChecked] = useState(false)


	const [columns] = useState([
		{ name: 'distributor', title: 'Distributor'},
		{ name: 'upc_id', title: 'UPC'},
		{ name: 'version_number', title: 'Version'},
		{ name: 'catalog_id', title: 'Catalog'},
		{ name: 'medium', title: 'Medium'},
		{ name: 'type', title: 'Type'},
		{ name: 'description	', title: 'Description'},
		{ name: '', title: ''},
		{ name: '', title: ''},
	])


	function changeColor(item) {
		if (item == 'distributor') {
			setDistributorChecked(!distributorChecked)
		}
		if (item == 'upc') {
			setUpcChecked(!upcChecked)
		}
		if (item == 'version_number') {
			setVersionNumberChecked(!versionNumberChecked)
		}
		if (item == 'medium') {
			setMediumChecked(!mediumChecked)
		}
		if (item == 'catalog') {
			setCatalogChecked(!catalogChecked)
		}
		if (item == 'description') {
			setDescriptionChecked(!descriptionChecked)
		}
		if (item == 'type') {
			setTypeChecked(!typeChecked)
		}
	}

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
				setPage(newPage);
			};

	const handleChangeRowsPerPage = (event) => {
				setRowsPerPage(parseInt(event.target.value, 10));
				setPage(0);
			};

	function handleUpdate(e) {
				e.preventDefault()
				if (versionNumberChecked)
						{var version_number = e.target.version_number.value}
				if (catalogChecked)
						{var catalog = e.target.catalog.value}
				if (mediumChecked)
						{var medium = e.target.medium.value}
				if (typeChecked)
						{var type = e.target.type.value}
				if (distributorChecked)
						{var distributor = e.target.distributor.value}
				if (upcChecked)
						{var upc = e.target.upc.value}
				if (descriptionChecked)
						{var description = e.target.description.value}
				
				// select which elements to update on
				fetch('http://localhost:5000/income/update-errors', {
					method: 'PUT',
					body: JSON.stringify(
						{
							'upc_id': e.target.new_upc.value,
							'data_to_match' : 
								[
									{
										'distributor': distributor,
										'upc_id': upc,
										'catalog_id': catalog,
										'type': type,
										'version_number': version_number,
										'medium': medium,
										'description': description,
									}
								]
							}
					)
				})
			.then(res => fetch('http://localhost:5000/income/matching-errors'))
			.then(res => res.json())
			.then(json => 
				{ props.setRows(json)
					if (json.length === 0)
												{history.push('/income/import')}
										})
	
			.catch(res => setMsg('Error fetching data'))
						}

	return (
		<Container component={Paper}>
			<Table id="matching_error_table">
				<TableRow>
				{ columns.map((column) => 
						<TableCell>
						{ column.title }
						</TableCell>
				)}
				</TableRow>
			{ (rowsPerPage > 0 ?
				 props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				: props.rows
			).map((row) => 
				<TableRow>
						<input type="hidden"
							form={`form${row.id}`}
							id="entry_id"
							value={row.id}
							/>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.distributor}
							id="distributor"
							/>
						<TableCell
							id={`distributor${row.id}`}
							className={ distributorChecked ? classes.active : null }
							onClick={()=>changeColor('distributor')}
						>
							{ row.distributor }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.upc_id}
							id="upc"
							/>
						<TableCell
							id={`upc${row.id}`}
							className={ upcChecked ? classes.active : null }
							onClick={()=>changeColor('upc')}
						>
						{ row.upc_id }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.version_number}
							id="version_number"
							/>
						<TableCell
							id={`version_number${row.id}`}
							className={ versionNumberChecked ? classes.active : null }
							onClick={()=>changeColor('version_number')}
						>
						{ row.version_number }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.catalog_id}
							id="catalog"
							/>
						<TableCell
							id={`catalog${row.id}`}
							className={ catalogChecked ? classes.active : null }
							onClick={()=>changeColor('catalog')}
						>
						{ row.catalog_id }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.medium}
							id="medium"
							/>
						<TableCell
							id={`medium${row.id}`}
							className={ mediumChecked ? classes.active : null }
							onClick={()=>changeColor('medium')}
						>
						{ row.medium }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.type}
							id="type"
							/>
						<TableCell
							className={ typeChecked ? classes.active : null }
							onClick={()=>changeColor('type')}
						>
						{ row.type }
						</TableCell>
						<input type="hidden"
							form={`form${row.id}`}
							value={row.description}
							id="description"
							/>
						<TableCell
							id={`description${row.id}`}
							className={ descriptionChecked ? classes.active : null }
							onClick={()=>changeColor('description')}
						>
						{ row.description }
						</TableCell>
						<TableCell>
							<select
								form={`form${row.id}`}
								id="new_upc">
								{upcChoices}
							</select>
						</TableCell>
						<TableCell>
							<form
								id={`form${row.id}`}
								onSubmit={handleUpdate}>
								<Button
									variant="outlined"
									color="primary"
									type="submit"
									id="update">
								Update
								</Button>
							</form>
						</TableCell>
				</TableRow>
			)}
		        <TableFooter>
		          <TableRow>
		            <TablePagination
		              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
		              colSpan={3}
		              count={props.rows.length}
		              rowsPerPage={rowsPerPage}
		              page={page}
		              SelectProps={{
										                inputProps: { 'aria-label': 'rows per page' },
											                native: true,
											              }}
		              onChangePage={handleChangePage}
		              onChangeRowsPerPage={handleChangeRowsPerPage}
		              ActionsComponent={TablePaginationActions}
		            />
		          </TableRow>
		        </TableFooter>
			</Table>
		</Container>
		);
}


export default MatchingTable
