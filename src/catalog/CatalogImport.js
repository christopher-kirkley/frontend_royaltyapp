import React, { useState } from 'react';

import { useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button';


function CatalogImport () {

	const [msg, setMsg] = useState('')

	function handleUpload(e) {
		e.preventDefault()
		const file = e.target.upload.files[0]
		fetch('http://localhost:5000/catalog/import', {
				method: 'POST',
				body: file
			})
		.then(resp => resp.json())
		.then(res => setMsg('1 file uploaded'))
		.catch(error => setMsg('Error uploading'))
	}

	return (
		<div>
			<form onSubmit={handleUpload} id="form">
				<div>
				<label>Upload CSV</label>
				<input id="file_to_upload" name="upload" type="file"/>	
				<input name="text" type="text"/>	
				</div>
				<input type="submit" id="submit" value="upload"/>
			</form>
			<h3 id='msg'>{ msg }</h3>
		</div>
	)}



export default CatalogImport;
