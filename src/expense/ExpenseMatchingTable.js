import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import NativeSelect from '@material-ui/core/NativeSelect';
import Drawer from '@material-ui/core/Drawer';

import UpdateModal from './UpdateModal'
import MatchModal from './MatchModal'
import MatchForm from './MatchForm'
import UpdateForm from './UpdateForm'

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


function ExpenseMatchingTable(props) {

	const history = useHistory()

	const data = React.useMemo( () => props.rows)

	const columns = React.useMemo(
				() => [
								{ accessor: 'date', Header: 'Date'},
								{ accessor: 'vendor', Header: 'Vendor'},
								{ accessor: 'artist_name', Header: 'Artist'},
								{ accessor: 'catalog_number', Header: 'Catalog'},
								{ accessor: 'description', Header: 'Description'},
								{ accessor: 'net', Header: 'Net'},
								{ accessor: 'item_type', Header: 'Item'},
								{ accessor: 'expense_type', Header: 'Type'},
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
				initialState: { pageIndex: 0, pageSize: 10 },
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
	const [ matchOpen, setMatchOpen ] = useState(false)

	const [ selected, setSelected ] = useState(['0'])

	function handleOpen() {
		setOpen(true)
		const indexes = Object.keys(selectedRowIds)
	}

	function handleMatchOpen() {
		setMatchOpen(true)
	}

	function handleMatchClose() {
		setMatchOpen(false)
	}

	function handleClose() {
		setOpen(false)
	}

	function handleMatch() {
	}

	function onSubmit(data) {
		console.log(data)
		// if (data['date'])
		// { var distributor = data['date']}
		// if (data['vendor'])
		// { var upc_id = data['vendor']}
		// if (data['artist_name'])
		// { var catalog_id = data['artist_name']}
		// if (data['type'])
		// { var type = data['type']}
		// if (data['medium'])
		// { var medium = data['medium']}
		// if (data['version_number'])
		// { var version_number = data['version_number']}
		// if (data['description'])
		// { var description = data['description']}
		// 		fetch('http://localhost:5000/expense/update-errors', {
		// 			method: 'PUT',
		// 			body: JSON.stringify(
		// 				{
		// 					'upc_id': data['new_value'],
		// 					'data_to_match' : 
		// 						[
		// 							{
		// 								'distributor': distributor,
		// 								'upc_id': upc_id,
		// 								'catalog_id': catalog_id,
		// 								'type': type,
		// 								'version_number': version_number,
		// 								'medium': medium,
		// 								'description': description,
		// 							}
		// 						]
		// 					}
		// 			)
		// 		})
		// 	.then(res => res.json())
		// 	.then(json => {
		// 		props.setUpdated(json['updated'])
		// 		props.setAlert(true)
		// 	})
		// 	.then(res => fetch('http://localhost:5000/income/matching-errors'))
		// 	.then(res => res.json())
		// 	.then(json => {
		// 		props.setRows(json)
		// 		if (json.length === 0 ) {
		// 			history.push('/income/import')
		// 		}
		// 	})
		// 	.then(res => setMatchOpen(false))
	}

	return (
		<div>
		{ 
			Object.keys(selectedRowIds).length > 0
			?
			<UpdateForm
				selected={selected}
				type={props.type}
				selectedRowIds={selectedRowIds}
				rows={props.rows}
				getMatchingErrors={props.getMatchingErrors}
			/>
			:
			null
		}

		 <Table {...getTableProps()}
				size="small"
				id="matching_error_table"
			>
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


export default ExpenseMatchingTable
