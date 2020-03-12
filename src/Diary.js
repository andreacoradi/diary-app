import React, { Component } from "react";

import "./Diary.css"
//import "./Login.css"
import logo from "./logo.svg"
import menu_btn from "./menu_logo.svg"
import page_icon from "./page_icon.svg"
import { Redirect } from "react-router-dom";


const API_URL = "http://localhost:5000/api/"

export default class Diary extends Component {

	state = {
		username: "",
		pages: []
	}

	componentDidMount() {

		const token = localStorage.getItem('token')
		if (!token) {
			console.log("Non ho il token :(")
			localStorage.clear();
			return
		}
		console.log("Ho il token")
		console.log(token)
		console.log("Making request")
		fetch(API_URL + "pages",
			{ headers: { "x-access-token": token } })
			.then(r => r.json())
			.then(b => {
				console.log(b)
				this.setState({ username: b.username, pages: b.pages })
				this.setPages()
			})

	}




	getDate = () => {
		const d = new Date()
		let day = d.getDate()
		if (day < 10)
			day = "0" + day
		let month = d.getMonth() + 1
		if (month < 10)
			month = "0" + month
		const s = `${day}-${month}-${d.getFullYear()}`;
		//console.log(s)
		return s
	}

	setPages = () => {
		if (!this.state.username) {
			return
		}
		if (this.state.pages.length === 0) {
			return
		}
		this.state.pages.forEach(page => {
			//console.log(this.getDate(), page.date)
			if (this.getDate() === page.date) {
				document.getElementById("diary").innerText = page.content
			}
			// addPage()
		})
	}

	render() {
		return (
			<div>
				<nav className="navbar">
					<img id="menu_btn" src={menu_btn} alt="" />
					<ul className="navbar-nav">

						{
							this.state.pages.map(page => {
								return (
									<li class="nav-item">
										<a class="link-text" href="#">{page.date}</a>
										<img class="nav-link" src={page_icon} alt="" />
									</li>
								)
							})
						}


						{/* <li class="nav-item">
							<a class="link-text" href="#">23-03-2048</a>
							<img class="nav-link" src={page_icon} alt="" />
						</li>

						<li class="nav-item">
							<a class="link-text" href="#">44-12-1222</a>
							<img class="nav-link" src={page_icon} alt="" />
						</li> */}

					</ul>
				</nav>
				<div id="main">
					<header >

						<img id="logo_small" src={logo} alt="" />
					</header>
					<textarea
						spellCheck="false"
						placeholder="INSERT TITLE"
						name="diary" id="diary" rows="40" />
				</div>
			</div>
		)
	}
}