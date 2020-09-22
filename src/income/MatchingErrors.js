import React, { useState, useEffect } from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddStatementForm from './AddStatementForm'
import MatchingTable from './MatchingTable'

import Paper from '@material-ui/core/Paper';

import { EditingState } from '@devexpress/dx-react-grid'
import {
	  Grid,
	  Table,
	  TableHeaderRow,
	  TableEditRow,
	  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'

function MatchingErrors() {

	const history = useHistory()

	
	const data = []

		return (
			<Container>
				<Header name='Matching Errors'/>
				<MatchingTable />
			</Container>
		)
	}


export default MatchingErrors
