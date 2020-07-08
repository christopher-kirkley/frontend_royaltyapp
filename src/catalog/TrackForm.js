import React, { useState, useEffect } from 'react'

import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'

function TrackForm() {

	
	return (
		<Container>
		<form>
			<input type="text"/>
			<input type="text"/>
			<input type="text"/>
			<input type="submit" value="Submit"/>
		</form>
		</Container>
	)
}

export default TrackForm

