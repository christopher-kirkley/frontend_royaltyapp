import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ConditionalButton from '../components/ConditionalButton'

function VersionAddForm(props) {

		return (
					<React.Fragment>
					<Grid container style={{marginTop: 5}}>
						<Grid item xs={3}>
							<TextField
								variant="outlined"/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								variant="outlined"/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								variant="outlined"/>
						</Grid>
						<Grid item xs={2}>
							<TextField
								variant="outlined"/>
						</Grid>
						<Grid item xs={1} justify="center" >
						</Grid>

					<Grid item container spacing={2} style={{marginTop: 6}} alignItems="left">
						<Grid item xs={1}>
							<Button
								variant="contained"
								color="primary"
								id="add_version"
								fullWidth	
								name="add_version"
								disabled={props.edit ? false: true}
							>+
							</Button>
						</Grid>
					</Grid>
					</Grid>

					</React.Fragment>

					
				)
}

export default VersionAddForm
