import React, { useState, useEffect, useContext } from 'react'
import Cookies from "js-cookie";

import './App.css';

import Main from './Main'

import SessionContextProvider from './hooks/SessionContext'
import Home from './home/Home'


import {
  BrowserRouter as Router,
  Switch,
  Route,
	Redirect,
  Link,
	useHistory
} from "react-router-dom";



import { 
	Button,
	AppBar,
	Toolbar,
} from "@material-ui/core"

function App() {


	return (
		<SessionContextProvider>
			<Main/>
		</SessionContextProvider>
	)

}

export default App;
