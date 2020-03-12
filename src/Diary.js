import React, { Component } from "react";

import "./Diary.css"


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
				<h1>Diary</h1>
				<textarea name="diary" id="diary" rows="40" />
			</div>
		)
	}
}