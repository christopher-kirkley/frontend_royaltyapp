
const getArtists = async (name) => {
	let resp = await fetch('http://localhost:5000/artists', {
		credentials: 'include',
		method: 'GET'
	})
	let data = await resp.json()
	console.log(data)
	return data
}

export const service = {
	getArtists,
}


