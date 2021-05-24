import { Context } from '../ApiStore';

const BASE_URL = 'http://localhost:5000'

const getAll = async (resource) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		credentials: 'include',
		method: 'GET'
	})
	let data = await resp.json()
	const sorted = [...data].sort(function(a, b){
		if(a.artist_name < b.artist_name) {return -1;}
		if(a.artist_name > b.artist_name) {return 1;}
	})
	return sorted
}

export const service = {
	getAll,
}


