import React, { Component } from "react";
import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";
import Artist from "./Artist";
import AddArtist from "./AddArtist";
import Test from "./Test";

class Main extends Component {
	render() {
		return (
			<HashRouter>
			<div>
				<h1>Simple SPA</h1>
				<ul className="header">
					<li><NavLink to="/">Home</NavLink></li>
					<li><NavLink to="/artist" id="artist">Artist</NavLink></li>
					<li><NavLink to="/test" id="test">Test</NavLink></li>
				</ul>
			<div className="content">
				<Route path="/artist" component={Artist}/>
				<Route path="/add_artist" component={AddArtist}/>
				<Route path="/test" component={Test}/>
			</div>
		</div>
		</HashRouter>
	);
}
}
				
export default Main;
