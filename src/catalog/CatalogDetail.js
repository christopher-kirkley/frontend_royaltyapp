import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'

function CatalogDetail () {
	const { id } = useParams()

	const [catalog, setCatalog] = useState([])
	
	const { register, handleSubmit, error, setValue } = useForm()
	
	useEffect(() => { 
		fetch(`http://localhost:5000/catalog/${id}`)
		.then(res => res.json())
		.then(json => setCatalog(json))
	}, [])

	useEffect(() => {
		console.log(catalog)
		// setValue([
		// 	{catalog_number: catalog.catalog_number},
		// 	{catalog_name: catalog.catalog_name},
		// 	{artist_name: catalog.artist.artist_name},
		// ])
	}, [catalog])

		

	function onSubmit(data) {
		// const artist_name = data.artist_name
		// const prenom = data.prenom
		// const surnom = data.surnom
		// // send json to update
		// fetch(`http://localhost:5000/artists/${id}`, {
		// 	method: 'PUT',
		// 	body: JSON.stringify({ artist_name, prenom, surnom }),
		// })
		// .then(res => res.json())
		// .then(json => console.log(json))
	}

	return (
			<div>
				<h1 id="heading">Catalog Detail</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" name="id" id="id" ref={register}/>
					<label>Catalog Number:  
					<input type="text" name="catalog_number" id="catalog_number" ref={register}/>
					</label><br/>
					<label>Catalog Name:
					<input type="text" name="catalog_name" id="catalog_name" ref={register} />
					</label><br/>
					<label>Artist
					<input type="text" name="artist_name" id="artist_name" ref={register}/>
					</label><br/>
					<input id="update" value="Update" type="submit"/>
				</form>
		</div>
	)}



export default CatalogDetail;
