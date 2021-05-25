import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';


import { useForm, Controller } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'

import { SessionContext } from '../hooks/SessionContext'
import { service } from '../_services/services.js'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

	const { handleSubmit, control, setValue } = useForm()

	const history = useHistory()

	const [ msg, setMsg ] = useState(false)

	const { session, setSession } = useContext(SessionContext)

	function displayMessage() {
		setMsg(true)

		setTimeout(() => {
			setMsg(false)
		}, 3000)
	}

	function login(data) {
		const email = data.email
		const password = data.password
		console.log(data)
		service.postData('login', { email, password })
		.then(data => {
			if (data['success'] == 'true') {
				setSession(true)
				history.push('/dashboard')
			} else { 
				displayMessage()
			}
		}
		)
		.catch(error => {
			displayMessage()
		})
	}

	function onSubmit(data) {
		login(data)
	}


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
						as={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
						control={control}
            autoFocus
          />
          <Controller
						as={TextField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
						control={control}
          />
          <Button
						id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container alignContent="center">
            <Grid item xs>
            </Grid>
          </Grid>
					{ msg
						?
						<Alert id="alert" severity="error">Invalid Login!</Alert>
						:
						null
					}
        </form>
      </div>
    </Container>
  );
}

