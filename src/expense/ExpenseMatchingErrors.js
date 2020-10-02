import React from 'react';

import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';

import ExpenseMatchingTable from './ExpenseMatchingTable' 

import Header from '../components/Header'

function ExpenseMatchingErrors() {

		return (
			<Container>
				<Header name='Expense Matching Errors'/>
				<ExpenseMatchingTable/>
			</Container>
		)
	}


export default ExpenseMatchingErrors
