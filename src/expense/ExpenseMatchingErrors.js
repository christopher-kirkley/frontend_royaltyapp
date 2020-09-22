import React from 'react';

import { useHistory } from "react-router-dom";

import Container from '@material-ui/core/Container';

import Header from '../components/Header'
import ExpenseTable from './ExpenseTable'

function ExpenseMatchingErrors() {

		return (
			<Container>
				<Header name='Expense Matching Errors'/>
				<ExpenseTable/>
			</Container>
		)
	}


export default ExpenseMatchingErrors
