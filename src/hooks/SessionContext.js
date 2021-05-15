import React, { createContext, useState, useEffect } from 'react'
import Cookies from "js-cookie";

export const SessionContext = createContext(null)

function SessionContextProvider(props) {

	const [ session, setSession ] = useState(false)

	useEffect(() => {
		let data = Cookies.get('session')
		if (data == 'true') {
			setSession(true)
		}
		if (data == 'false') {
			setSession(false)
		}
		else {
			setSession(false)
		}
	}, [])

	return (
		<SessionContext.Provider value={{session, setSession}}>
		{props.children}
		</SessionContext.Provider>
	)
}

export default SessionContextProvider;
