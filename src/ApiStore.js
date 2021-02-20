import React, { useState, useEffect } from 'react'

const initialState = {
	name: 'Bob Schmob'
}

export const Context = React.createContext()

const ApiStore = ({ children }) => {
	const [state, setState] = useState(initialState);
	const [catalog, setCatalog] = useState([]);

	useEffect(() => { 
		fetch('http://localhost:5000/catalog')
		.then(res => res.json())
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.catalog_number < b.catalog_number) {return -1;}
				if(a.catalog_number > b.catalog_number) {return 1;}
			})
			setCatalog(sorted)
		})
	}, [])

	const [artists, setArtists] = useState([])
	const [loading, setLoading] = useState(false)
	
	useEffect(() => { 
		setLoading(true)
		fetch('http://localhost:5000/artists')
		.then(res => res.json())
		.then(json => {
			const sorted = [...json].sort(function(a, b){
				if(a.artist_name < b.artist_name) {return -1;}
				if(a.artist_name > b.artist_name) {return 1;}
			})
			setArtists(sorted)
			setLoading(false)
		})
	}, [])

	const [upcs, setUpcs] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/version')
				.then(res => res.json())
				.then(json => {
					const sorted = [...json].sort(function(a, b){
						if(a.version_number < b.version_number) {return -1;}
						if(a.version_number > b.version_number) {return 1;}
					})
					setUpcs(sorted)
				})
			}, [])

	const [tracks, setTracks] = useState([])

	useEffect(() => {
				fetch('http://localhost:5000/tracks')
				.then(res => res.json())
				.then(json => {
					const sorted = [...json].sort(function(a, b){
						if(a.isrc < b.isrc) {return -1;}
						if(a.isrc > b.isrc) {return 1;}
					})
					setTracks(sorted)
				})
			}, [])


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
