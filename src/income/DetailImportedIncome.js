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

import { service } from '../_services/services.js'

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
	const [bundles, setBundles] = useState([])
	const [tracks, setTracks] = useState([])

	useEffect(() => { 
		if (id) {
		service.getAll(`income/statements/${id}`)
		.then(json =>
			{
				setStatement(json[0]['data'])
				setSummary(json[0])
				setPhysicalVersions(json[0]['physical'])
				setDigitalVersions(json[0]['digital'])
				setTracks(json[0]['track'])

				const bundles = [...json[0]['bundles']].sort(function(a, b){
					if(a.bundle_number < b.bundle_number) {return -1;}
					if(a.bundle_number > b.bundle_number) {return 1;}
				})
				setBundles(bundles)

				const physical = [...json[0]['physical']].sort(function(a, b){
					if(a.version_number < b.version_number) {return -1;}
					if(a.version_number > b.version_number) {return 1;}
				})
				setPhysicalVersions(physical)

				const digital = [...json[0]['digital']].sort(function(a, b){
					if(a.version_number < b.version_number) {return -1;}
					if(a.version_number > b.version_number) {return 1;}
				})
				setDigitalVersions(digital)

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
								versions={bundles}
								type={'bundles'}
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
