import React from 'react'
import TodoItem from './TodoItem'
import ContactCard from './ContactCard'

function App(){
	const item = 'test item'
	const date = new Date()

	return (
		<div className="todo-list">
			<ContactCard contact={{
				name:"Mr. Wiggles",
				imgUrl:"http://url.com/",
				phone:"212-021-1422",
				email:"ad@adsf.com"
			}}
			/>
			<TodoItem />
			<TodoItem />
			<TodoItem />
			<TodoItem />
		</div>
	)
}

export default App
