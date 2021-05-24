import { Context } from '../ApiStore';
import axios from 'axios';

import Cookies from "js-cookie";

const BASE_URL = 'http://localhost:5000'

function csrf_token() {
	const token = Cookies.get('csrf_access_token')
	return token
}

const getAll = async (resource) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		method: 'GET'
	})
	let data = await resp.json()
	return data
	// const sorted = [...data].sort(function(a, b){
	// 	if(a.artist_name < b.artist_name) {return -1;}
	// 	if(a.artist_name > b.artist_name) {return 1;}
	// })
	// return sorted
}


const postItem = async (resource, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}

const post = async (resource) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
	})
	let res = await resp.json()
	return res
}

const postData = async (resource, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}

async function postGetFile(resource, name) {
	const resp = await axios({
		url: `${BASE_URL}/${resource}`,
		responseType: 'blob',
		method: 'post',
		withCredentials: true,
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
	})

	const blob = resp.data;
	const link = document.createElement("a");

	link.href = URL.createObjectURL(blob);
	link.download = `${name}.csv`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	}

const putItem = async (resource, id, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}

const put = async (resource, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}


function postFile(resource, formData) {
	 return fetch(`${BASE_URL}/${resource}`, {
			method: 'POST',
			body: formData,
			credentials: 'include',
			headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		})
	.then(res => res.json())
	.then(res => {
		console.log(res)
		return res
	})
	.catch(error => {
		console.log(error)
		return error
	})
}

const _delete = async (resource, data) => {
	let resp = await fetch(`${BASE_URL}/${resource}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
		body: JSON.stringify(data),
	})
	let res = await resp.json()
	return res
}

const _deleteItem = async (resource, id) => {
	let resp = await fetch(`${BASE_URL}/${resource}/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: { 'X-CSRF-TOKEN': csrf_token() }, 
	})
	let res = await resp.json()
	return res
}

export const service = {
	getAll,
	putItem,
	postItem,
	postFile,
	put,
	_delete,
	_deleteItem,
	post,
	postData,
	postGetFile,
}


