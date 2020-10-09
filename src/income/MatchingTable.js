import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import UpdateModal from './UpdateModal'
import MatchModal from './MatchModal'

import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table'

import { makeStyles, useTheme } from '@material-ui/core/styles';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const useStyles = makeStyles(theme => ({
	highlight: {
		backgroundColor: "green"
	},
}))

function MatchingTable(props) {
	const classes = useStyles();

	const data = React.useMemo( () => props.rows)

	const columns = React.useMemo(
				() => [
								{ accessor: 'id', Header: 'ID'},
								{ accessor: 'upc_id', Header: 'UPC'},
								{ accessor: 'distributor', Header: 'Distributor'},
								{ accessor: 'catalog_id', Header: 'Catalog'},
								{ accessor: 'medium', Header: 'Medium'},
								{ accessor: 'type', Header: 'Type'},
								{ accessor: 'description', Header: 'Description'},
				],
		[])


 const {
			getTableProps,
			getTableBodyProps,
			headerGroups,
			page,
			prepareRow,
	 		gotoPage,
	 		pageCount,
	 		canNextPage,
	 		canPreviousPage,
	 		previousPage,
	 		nextPage,
	 		pageOptions,
	 		setPageSize,
	 		state: { pageIndex, pageSize, selectedRowIds },
		} = useTable(
			{ columns,
				data,
				initialState: { pageIndex: 0, pageSize: 25 },
			},
			useSortBy,
			usePagination,
			useRowSelect,
			hooks => {
				hooks.visibleColumns.push(columns => [
					// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllPageRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						</div>
						),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			])
		}
	)

	function handleDelete() {
		const index = Object.keys(selectedRowIds)
	}

	const [ open, setOpen ] = useState(false)
	const [ match, setMatch ] = useState(false)

	const [ selected, setSelected ] = useState(['0'])


	function handleOpen() {
		setOpen(true)
		const indexes = Object.keys(selectedRowIds)
		const sel = indexes.map((index) =>
			props.rows[index])
	}

	function handleClose() {
		setOpen(false)
	}

	function handleMatch(id) {
		setMatch(!match)
	}

	function handleSelected(cell) {
		console.log(cell)
		if (cell.column.id == 'upc_id')
			{setUpc(cell.value)}
	}

	const [ upc, setUpc ] = useState('')

	const [ sel, setSel ] = useState(false)

	return (
		<div>
			<UpdateModal
				handleClose={handleClose}
				handleOpen={handleOpen}
				open={open}
				selected={selected}
			/>

		{ match ?
			<Grid container style={{padding: 20}} spacing={1}>
				<Grid item xs={3}>
					<Typography variant="subtitle1">
					Select cells to match:
					</Typography>
				</Grid>
			{ upc !== ''
				?
				<Grid item xs={12}>
					<Typography variant="subtitle1">
					UPC is equal to {upc}
					</Typography>
				</Grid>
				:
				null
			}
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="secondary"
						size="small"
					>
					Update
					</Button>
				</Grid>
			</Grid>
			:

			Object.keys(selectedRowIds).length > 0 ?

			<Grid container style={{backgroundColor: "grey", padding: 20}}>
				<Grid item xs={8}>
					<Typography variant="subtitle1">{ Object.keys(selectedRowIds).length } rows selected.</Typography>
				</Grid>
				<Grid item>
					
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						size="small"
						onClick={handleOpen}
					>
					Update
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						size="small"
						onClick={handleDelete}
					>
					Delete
					</Button>
				</Grid>
			</Grid>
			:
			<Grid container style={{padding: 20}} justify="flex-end">
				<Grid item xs={2} >
					<Button
						variant="contained"
						color="secondary"
						size="small"
						onClick={handleMatch}
					>
					 Match
					</Button>
				</Grid>
			</Grid>
		}
		 <Table {...getTableProps()} size="small">
			 <TableHead>
				 {// Loop over the header rows
				 headerGroups.map(headerGroup => (
					 // Apply the header row props
					 <TableRow {...headerGroup.getHeaderGroupProps()}>
						 {// Loop over the headers in each row
						 headerGroup.headers.map(column => (
							 // Apply the header cell props
							 <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
								 {column.render('Header')}
							 		<span>
							 			{column.isSorted
											? columns.isSortedDesc
											? ' > '
											: ' < '
										: ''}
							 		</span>
							 </TableCell>
						 ))}
					 </TableRow>
				 ))}
			 </TableHead>
			 {/* Apply the table body props */}
			 <TableBody {...getTableBodyProps()}>
				 {// Loop over the table rows
				 page.map(row => {
					 // Prepare the row for display
					 prepareRow(row)
					 return (
						 // Apply the row props
						 <TableRow {...row.getRowProps()}
						 >
							 {// Loop over the rows cells
							 row.cells.map((cell, index) => {
								 // Apply the cell props
								 return (
									 <TableCell {...cell.getCellProps()}
											onClick={() => handleSelected(cell)}
									 	>

										 {// Render the cell contents
										 cell.render('Cell')}
									 </TableCell>
								 )
							 })}
						 	<TableCell>
						 	</TableCell>
						 </TableRow>
					 )
				 })}
			 </TableBody>
		 </Table>
			<div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
		          {'<<'}
		        </button>{' '}
		        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
		          {'<'}
		        </button>{' '}
		        <button onClick={() => nextPage()} disabled={!canNextPage}>
		          {'>'}
		        </button>{' '}
		
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
			</div>
		</div>
		)
}


export default MatchingTable
