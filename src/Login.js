import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Login.css"
import logo from "./logo.svg"
import login_icon from "./login_btn.svg"

const AUTH_URL = "https://jwt-auth-deno.herokuapp.com/";
// const AUTH_URL = "http://localhost:4000/";

class Login extends Component {
    constructor(props) {
        super(props)
        let username = ""
        let password = ""
        if (this.props.location.state) {
            username = this.props.location.state.username
            password = this.props.location.state.password
        }
        this.state = {
            username: username,
            password: password,
            token: "",
            logged: false,
            primaVolta: true
        };
    }

    componentDidMount = () => {
        if (this.props.location.state) {
            console.log(this.props.location.state)
            document.getElementById("username").value = this.props.location.state.username
            document.getElementById("password").value = this.props.location.state.password
        }
        const token = localStorage.getItem('token')
        if (!token) {
            console.log("Non ho il token :(")
            localStorage.clear();
            return
        }
        console.log("Ho il token!", token)
        const API_URL = "auth"
        // console.log(JSON.stringify(token))
        // console.log(token)
        const h = new Headers()
        h.append("x-access-token", token)
        fetch(AUTH_URL + API_URL, {
            headers: h
        })
            .then(r => {
                if (!r.ok) {
                    console.log("Cancello token");
                    localStorage.clear();
                } else {
                    console.log("FATTOOO");
                    this.setState({ logged: true })
                }
            })

    }

    signIn = () => {
        if (!this.state.username || !this.state.password) {
            console.log("Not Provided");
            document.getElementById("error").innerText = "Provide username and password"
            return;
        }
        console.log(JSON.stringify({ password: this.state.password }))
        let API_URL = `users/${this.state.username}`
        fetch(AUTH_URL + API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: this.state.password })
        })
            .then(r => r.json())
            .then(b => {
                if (b.msg) {
                    document.getElementById("error").innerText = b.msg
                }
                console.log(b.msg)
                // console.log(b)
                if (b.authenticated) {
                    const jwt = b.jwt
                    this.setState({ token: b.jwt })
                    console.log(jwt)
                    localStorage.setItem('token', jwt)
                    this.setState({ logged: true })
                }
            });
    };

    render() {
        if (this.state.logged) {
            return (
                <Redirect
                    to={{
                        pathname: "/diary",
                        state: {
                            token: this.state.token
                        }
                    }}
                />
            )
        }


        return (

            <div>
                <img id="logo" src={logo} alt="" />
                <p>
                    <input className="input"
                        id="username"
                        placeholder="username"
                        //value={username}
                        type="text"
                        required
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                </p>
                <p>
                    <input className="input"
                        id="password"
                        placeholder="password"
                        //value={password}
                        type="password"
                        required
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </p>
                <p id="error"></p>
                <img onClick={
                    this.signIn} id="login_button" src={login_icon} alt="" />
                <p>Not registered? <Link to="/register">Register</Link></p>
            </div>
        );
    }
}

export default Login;
