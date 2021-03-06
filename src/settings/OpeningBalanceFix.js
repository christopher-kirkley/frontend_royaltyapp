import React, { useState, useEffect, useContext } from 'react';

import Header from "../components/Header";

import { Redirect } from 'react-router-dom'
import {
	NavLink
} from "react-router-dom";

import { useHistory } from "react-router-dom";

import { useForm, Controller } from 'react-hook-form'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Modal from '@material-ui/core/Modal'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import OrderModal from './OrderModal'
import ImportOpeningBalance from './ImportOpeningBalance'

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';

import { makeStyles } from '@material-ui/core/styles';

import { service } from '../_services/services.js'

const useStyles = makeStyles(theme => ({
		paper: {
			padding: 20,
		},
		modal: {
					position: 'absolute',
					width: 400,
					backgroundColor: theme.palette.background.paper,
					border: '2px solid #000',
					boxShadow: theme.shadows[5],
					padding: theme.spacing(2, 4, 3),
				},
}))


function OpeningBalanceFix() {

	const [rows, setRows] = useState([])

	const [ updated, setUpdated ] = useState('')

	const [ alert, setAlert ] = useState(false)

	const { artistsContext } = useContext(Context)

	const [artists, setArtists] = artistsContext

	const artistChoices = artists.map((artist) =>
		{
			return (
				<option
					id="artistId"
					value={artist.id}
				>{artist.artist_name}
				</option>
			)
		})

	useEffect(() => {
				service.getAll('statements/opening-balance-errors')
				.then(json => {
					setRows(json)
				})
			}, [])

	function getRows() {
				service.getAll('statements/opening-balance-errors')
				.then(json => {
					setRows(json)
				})
	}


	function handleSubmit(e) {
		e.preventDefault()
		var newId = e.target.newId.value
		var artistId = e.target.artistId.value
	
		const obj = {
				'id': newId,
				'artist_id': artistId
		}

		service.postData('statements/opening-balance-errors', obj)
				.then(res => getRows())
	}
	


	return (
		<Container>
		<Header name="Fix Opening Balance Errors"/>
			<Grid container direction="row" >
				<Grid item xs={12}>
					<Alert severity="error">You have { rows.length} matching errors</Alert>
					<Divider style={{marginTop: 10}}/>
					<Paper>

					<Table id="opening-balance-errors">
					<TableRow>
					<TableCell>Artist</TableCell>
					<TableCell>Opening Balance</TableCell>
					<TableCell>Updated Artist</TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					</TableRow>
					{rows.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.artist_name}</TableCell>
							<TableCell>{row.balance_forward}</TableCell>
							<TableCell>
								<InputLabel htmlFor="catalog_artist">Primary Artist</InputLabel>
										<select
											id="artistId"
											defaultValue="1"
											form={`update-${row.id}`} 
										>
												{artistChoices}
										</select>
									<input
										type="hidden"
										id="newId"
										form={`update-${row.id}`}
										defaultValue={row.id}
									/>
							</TableCell>
							<TableCell>
							<form
								id={`update-${row.id}`}
								onSubmit={handleSubmit}>
								<Button
									id={`updatebutton-${row.id}`}
									size="small"
									variant="outlined"
									color="primary"
									type="submit"
								>
								Update
								</Button>
						</form>
							</TableCell>
						</TableRow>
					))}
					</Table>

					</Paper>
				</Grid>
				</Grid>

			<Snackbar open={alert}
				autoHideDuration={1500}
				anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
				onClose={()=>setAlert(false)}
			>
				<Alert severity="success">
				Updated {updated} errors!
				</Alert>
			</Snackbar>
		</Container>
		
	)
}


export default OpeningBalanceFix;
