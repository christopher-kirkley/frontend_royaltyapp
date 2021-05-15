import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { 
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect,
	useHistory } from 'react-router-dom'


import Login from "./home/Login"
import Home from "./home/Home"

function Test(){

	const history = useHistory()

	function handleSubmit() {
		history.push('/login')
	}


	return (
		<div>
		<Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
			</Switch>
		</Router>
		</div>
	);
}

	

export default Test;
