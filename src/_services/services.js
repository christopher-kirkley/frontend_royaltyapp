
const getArtists = async (name) => {
	let resp = await fetch('http://localhost:5000/catalog', {
		credentials: 'include',
		method: 'GET'
	})
	let data = await resp.json()
	return data
}

export const service = {
	getArtists,
}
