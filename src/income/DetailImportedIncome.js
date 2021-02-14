import React, { useState, useEffect } from 'react'

import { Redirect, useParams, useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header'
import IncomeTable from './IncomeTable'
import DetailImportedIncomeTable from './DetailImportedIncomeTable'
import DetailImportedIncomeSummary from './DetailImportedIncomeSummary'
import DetailImportedIncomeVersions from './DetailImportedIncomeVersions'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: 20,
	},
}))

function DetailImportedIncome() {

	const { id } = useParams()

	const classes = useStyles()

	const [statement, setStatement] = useState([])
	const [summary, setSummary] = useState([])
	const [digitalVersions, setDigitalVersions] = useState([])
	const [physicalVersions, setPhysicalVersions] = useState([])
	const [tracks, setTracks] = useState([])

	useEffect(() => { 
		if (id) {
		fetch(`http://localhost:5000/income/statements/${id}`)
		.then(res => res.json())
		.then(json =>
			{
				setStatement(json[0]['data'])
				setSummary(json[0])
				setPhysicalVersions(json[0]['physical'])
				setDigitalVersions(json[0]['digital'])
				setTracks(json[0]['track'])
			})
		}
	}, [])



	return (
			<Container>
				<Header name='Detail Imported Income'/>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<DetailImportedIncomeSummary summary={summary}/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<DetailImportedIncomeVersions
								type={'physical'}
								versions={physicalVersions}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<DetailImportedIncomeVersions
								versions={digitalVersions}
								type={'digital'}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} className={classes.paper}>
							<DetailImportedIncomeVersions
								versions={tracks}
								type={'tracks'}
							/>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		)
	}


export default DetailImportedIncome
