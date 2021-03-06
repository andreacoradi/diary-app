import React, { Component } from "react";

import "./Diary.css"
import logo from "./logo.svg"
import menu_btn from "./menu_logo.svg"
import page_icon from "./page_icon.svg"

import { Link } from "react-router-dom"

import { APP_URL } from "./APIEndpoints.js"


export default class Diary extends Component {

	state = {
		username: "",
		pages: [],
		timeout: 0
	}

	componentDidMount() {
		const token = localStorage.getItem('token')
		if (!token) {
			console.log("Non ho il token :(")
			localStorage.clear();
			return
		}
		console.log("Ho il token")
		console.log("Making request")
		fetch(APP_URL + "pages",
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
				this.setState({ currentPage: page })
				this.setCurrentPage()
			}

		})
	}

	save = async () => {
		const pages = this.state.pages
		const currentPage = this.state.currentPage
		let flag = true
		pages.forEach(page => {
			if (page.date === currentPage.date) {
				page.content = currentPage.content
				flag = false
			}
		})
		if (flag) {
			pages.push(currentPage)
		}
		await this.setState({
			pages: pages
		})
		//FETCH
		if (this.state.pages.length === 0) {
			console.log("OOPS")
			return
		}
		const body = {
			pages: this.state.pages
		}
		console.log("BODY", body)
		fetch(APP_URL + "pages", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-access-token": localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		}).then(r => r.json())
			.then(b => {
				console.log(b)
				//this.setState({ saved: true })
			})
	}

	setCurrentPage = () => {

		if (!this.state.currentPage) {
			return
		} else {
			//this.save()
		}
		const diary = document.getElementById("diary")
		diary.value = this.state.currentPage.content
		//console.log(diary.value)
	}

	setPageContent = (content) => {
		const page = this.state.currentPage
		page.content = content
		this.setState({ currentPage: page })
	}

	autosave = (evt) => {
		const text = evt.target.value
		if (this.state.timeout) clearTimeout(this.state.timeout);

		let page
		if (!this.state.currentPage) {
			page = {
				date: this.getDate(),
				content: ""
			}
		} else {
			page = this.state.currentPage
		}
		page.content = text

		this.setState({ currentPage: page })
		this.setCurrentPage()

		this.setState({
			timeout: setTimeout(() => {
				this.save()
			}, 3000)
		});

	}

	render() {
		let i = 0

		return (
			<div>
				<nav className="navbar">
					<img id="menu_btn" src={menu_btn} alt="" />
					<ul className="navbar-nav">

						{
							this.state.pages.map(page => {
								return (
									<li key={++i} className="nav-item">
										<p className="link-text" >{page.date}</p>
										<img onClick={async (e) => {
											await this.setState({ currentPage: page });
											this.setCurrentPage()
										}} className="nav-link" src={page_icon} alt="" />
									</li>
								)
							})
						}

					</ul>
				</nav>
				<div id="main">
					<header >
						<Link to="/"><img id="logo_small" src={logo} alt="" /></Link>

					</header>
					<textarea
						onChange={e => this.autosave(e)}

						spellCheck="false"
						placeholder="INSERT TITLE"
						name="diary" id="diary" rows="40" />
				</div>
			</div>
		)
	}
}