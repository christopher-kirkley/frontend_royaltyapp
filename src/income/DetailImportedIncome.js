import React, { useState, useEffect } from 'react'

import { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import ImportedIncomeTable from './ImportedIncomeTable'
import DetailImportedIncomeTable from './DetailImportedIncomeTable'

function DetailImportedIncome() {

	return (
			<Container>
				<Header name='Detail Imported Income'/>
				<DetailImportedIncomeTable/>
			</Container>
		)
	}


export default DetailImportedIncome
