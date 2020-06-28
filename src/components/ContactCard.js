import React from 'react'

function ContactCard(props) {
	console.log(props)
	return (

		<div className="contact-card">
			<img src={props.contact.imgUrl}/>
			<h1>{props.contact.name}</h1>
			<p>Phone: {props.contact.phone}</p>
			<p>Email: {props.contact.email}</p>
		</div>
	)


}

export default ContactCard
