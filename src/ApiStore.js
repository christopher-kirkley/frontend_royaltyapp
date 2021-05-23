import React, { useState, useEffect, useContext } from 'react'

import { service } from './_services/services.js'

import { SessionContext } from './hooks/SessionContext'

const initialState = {
	name: 'Bob Schmob'
}

export const Context = React.createContext()


const ApiStore = ({ children }) => {
	const [state, setState] = useState(initialState);
	const [catalog, setCatalog] = useState([]);
	const { session, setSession } = useContext(SessionContext)
	console.log(session)

	useEffect(() => { 
		fetch('http://localhost:5000/catalog', {
			credentials: 'include',
			method: 'GET'
		})
		.then(res => res.json())
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.catalog_number < b.catalog_number) {return -1;}
				if(a.catalog_number > b.catalog_number) {return 1;}
			})
			setCatalog(sorted)
		})
		.catch(res => console.log('error'))
	}, [session])

	const [artists, setArtists] = useState([])
	const [loading, setLoading] = useState(false)
	
	useEffect(() => { 
		setLoading(true)
		service.getArtists()
		.then(res => {
			const sorted = [...res].sort(function(a, b){
				if(a.artist_name < b.artist_name) {return -1;}
				if(a.artist_name > b.artist_name) {return 1;}
			})
			setArtists(sorted)
			setLoading(false)
		})
		.catch(res => console.log('error'))
	}, [session])

	const [upcs, setUpcs] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/version', {
			credentials: 'include',
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				const sorted = [...json].sort(function(a, b){
					if(a.version_number < b.version_number) {return -1;}
					if(a.version_number > b.version_number) {return 1;}
			})
			setUpcs(sorted)
		})
		.catch(res => console.log('error'))
		}, [session])

	const [tracks, setTracks] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/tracks', {
			credentials: 'include',
			method: 'GET'
		})
			.then(res => res.json())
			.then(json => {
				const sorted = [...json].sort(function(a, b){
					if(a.isrc < b.isrc) {return -1;}
					if(a.isrc > b.isrc) {return 1;}
				})
				setTracks(sorted)
			})
		.catch(res => console.log('error'))
		}, [session])


	return (
		<Context.Provider value={
			{
				  catalogContext: [catalog, setCatalog],
					artistsContext: [artists, setArtists],
					loadingContext: [loading, setLoading],
					upcContext: [upcs, setUpcs], 
					trackContext: [tracks, setTracks] }
		}>
			{children}
		</Context.Provider>
	)
}

export default ApiStore;
