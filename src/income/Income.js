import React from 'react';

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import AddStatementForm from './AddStatementForm'

function Income() {

	const history = useHistory()

	// function handleImportCatalog() {
	// 	history.push('/catalog/import')
	// }

	// function handleClick() {
	// 	history.push('/catalog/add')
	// }

		return (
			<Container>
				<Header name='Income'/>
				<AddStatementForm />
			</Container>
		)
	}


export default Income
