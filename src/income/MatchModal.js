import React, { useState, useEffect } from 'react'

import { useForm, Controller } from 'react-hook-form'

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Modal from '@material-ui/core/Modal';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
		paper: {
					width: 400,
					flexGrow: 1,
					backgroundColor: theme.palette.background.paper,
					border: '2px solid #000',
					boxShadow: theme.shadows[5],
					padding: theme.spacing(2, 4, 3),
				},
}));


function MatchModal(props) {

	const { register, control, handleSubmit } = useForm()

	const classes = useStyles();

	const [upcs, setUpcs] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/version')
				.then(res => res.json())
				.then(json => setUpcs(json))
			}, [])

	const upcChoices = upcs.map((upc) =>
		{
			return (
				<option
					id={upc.version_number}
					value={upc.upc}
				>{upc.version_number}
				</option>
			)
		})

	function onSubmit(data) {
		console.log(data)
	}

	const body = (
			<div style={{transform: "translate(100%, 50%)"}} className={classes.paper}>
				<Typography variant="h6" gutterBottom>Match Selected</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={1}>
						<Grid container item xs={12} spacing={2}>
							<Grid item={4}>
								<Typography variant="subtitle1">where UPC is</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									name="upc_id"
									id="upc_id"
									as={<NativeSelect>
											</NativeSelect>}
									control={control}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<Grid item={4}>
								<Typography variant="subtitle1">where Catalog is</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									name="catalog_id"
									id="catalog_id"
									as={<NativeSelect>
											</NativeSelect>}
									control={control}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<Grid item={4}>
								<Typography variant="subtitle1">where Medium is</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									name="medium"
									id="medium"
									as={<NativeSelect>
											</NativeSelect>}
									control={control}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<Grid item={4}>
								<Typography variant="subtitle1">where Type is</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									name="type"
									id="type"
									as={<NativeSelect>
											</NativeSelect>}
									control={control}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid container item xs={12} spacing={2}>
							<Grid item={4}>
								<Typography variant="subtitle1">where Description is</Typography>
							</Grid>
							<Grid item={4}>
								<Controller
									name="description"
									id="description"
									as={<NativeSelect>
											</NativeSelect>}
									control={control}
									fullWidth
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
						<Typography variant="subtitle1"></Typography>
						<Divider style={{marginTop: 5, marginBottom: 5}}/>
						</Grid>
						<Grid item xs={6}>
						<Typography variant="subtitle1">SET VERSION TO</Typography>
						</Grid>
						<Grid item={6}>
							<NativeSelect
								id="new_upc">
								{upcChoices}
							</NativeSelect>
						</Grid>
						<Grid container item style={{marginTop: 30}}
							justify="space-between"
						>
							<Grid item xs={2}>
								<Button
									size="small"
									color="secondary"
									variant="contained"
									onClick={props.handleMatchClose}
								>Cancel</Button>
							</Grid>
							<Grid item xs={2}>
								<Button
									variant="contained"
									color="primary"
									size="small"
									type="submit"
								>Update</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</div>
			);
	return (
		<Modal
			open={props.matchOpen}
		>
		{body}
		</Modal>
	)
}

export default MatchModal
