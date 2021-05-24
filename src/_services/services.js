import { Context } from '../ApiStore';

import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:5000'

const csrf_token = Cookies.get('csrf_access_token')

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


const postItem = async (resource, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}


const putItem = async (resource, id, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}


const postFile = async (resource, file) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token }, 
		body: file
	})
	let res = await resp.json()
	return res
}


export const service = {
	getAll,
	putItem,
	postItem,
	postFile,
}


