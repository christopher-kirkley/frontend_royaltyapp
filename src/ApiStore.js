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


	return (
		<Context.Provider value={ {catalogContext: [catalog, setCatalog], artistsContext: [artists, setArtists], loadingContext: [loading, setLoading] }}>
			{children}
		</Context.Provider>
	)
}

export default ApiStore;
