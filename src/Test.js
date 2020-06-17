import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'


function Form() {
	return (
		<form>
			<input type="text"></input>
		</form>
	)
}

function Test(){
	// declare variable tied to function
	const [count, setCount] = useState(0);
	const [word, setWord] = useState('cheese');
	const [form, showForm] = useState(<h1>heyooooo</h1>)

	useEffect(() => {
		const hey = document.querySelector('#hey')
		hey.innerHTML = count

	});


	return (
		<div className="Artist">
			{form}
			<p>Hey, you clicked {count}</p>
			<button onClick={() => showForm(<Form/>)}>hey</button>
			<p id="hey">Hey, {word}</p>
			<button onClick={() => setWord('potatoes')}>hey</button>
		</div>
	);
}

	

export default Test;
