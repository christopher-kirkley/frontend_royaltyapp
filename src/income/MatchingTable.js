import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { useTable, usePagination, useRowSelect } from 'react-table'

import { makeStyles, useTheme } from '@material-ui/core/styles';

// const columns = [
// ];

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

function MatchingTable(props) {

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
	 		pageOptions,
	 		state: { pageIndex, pageSize, selectedRowIds },
		} = useTable(
			{ columns,
				data,
				initialState: { pageIndex: 0 },
			},
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

	function handleUpdate() {
		console.log(selectedRowIds)
	}

	return (
		<div>
		{ Object.keys(selectedRowIds).length > 0 ?

			// null
			// :
			<Grid container style={{backgroundColor: "green", padding: 10}}>
				<Grid item xs={8}>
					<Typography variant="subtitle1">{ Object.keys(selectedRowIds).length } rows selected.</Typography>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						size="small"
						onClick={handleUpdate}
					>
					Update
					</Button>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						size="small"
					>
					Delete
					</Button>
				</Grid>
			</Grid>
			:
			null
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
							 <TableCell {...column.getHeaderProps()}>
								 {// Render the header
								 column.render('Header')}
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
						 <TableRow {...row.getRowProps()}>
							 {// Loop over the rows cells
							 row.cells.map(cell => {
								 // Apply the cell props
								 return (
									 <TableCell {...cell.getCellProps()}>
										 {// Render the cell contents
										 cell.render('Cell')}
									 </TableCell>
								 )
							 })}
						 </TableRow>
					 )
				 })}
			 </TableBody>
		 </Table>
			<div className="pagination">
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
