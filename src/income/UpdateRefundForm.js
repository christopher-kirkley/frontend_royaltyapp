import React, { useState, useEffect, useContext } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import Modal from '@material-ui/core/Modal';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import ApiStore from '../ApiStore';
import { Context } from '../ApiStore';

const useStyles = makeStyles((theme) => ({
	paper: {
			},
}));


function UpdateRefundForm(props) {

	const { register, control, handleSubmit } = useForm()

	const classes = useStyles();

	const numSelect = props.selected.length

	function handleDelete() {
		const index = Object.keys(props.selectedRowIds)
		console.log(index)

	}


	return (
		<React.Fragment>
			<Grid container style={{padding: 20}}>
				<Grid item xs={2}>
					<Typography variant="caption">{ Object.keys(props.selectedRowIds).length } rows selected.</Typography>
				</Grid>
				<Grid item xs={10}>
					<form onSubmit={handleSubmit(props.submitUpdateErrors)}>
						<Grid container justify="space-around">
							<Grid item xs={4} align="right">
							<Typography variant="subtitle1">Set {props.type} to</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									as={
										<TextField>
										</TextField>
									}
									control={control}
									id="new_value"
									name="new_value"
								/>
							</Grid>
							<Grid item xs={1}>
								<Button
									id="update"
									variant="contained"
									color="primary"
									size="small"
									type="submit"
								>
								Update
								</Button>
							</Grid>
							<Grid item xs={1}>
								<Button
									id="delete"
									variant="contained"
									size="small"
									onClick={props.deleteErrors}
								>
								Delete
								</Button>
							</Grid>
						</Grid>
				</form>
				</Grid>
			</Grid>
			<Divider/>
		</React.Fragment>
	)
}

export default UpdateRefundForm
