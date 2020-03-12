import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import logo from "./logo.svg"
import register_btn from "./register_btn.svg"

const AUTH_URL = "https://diary-api-deno.herokuapp.com/api/";
// const AUTH_URL = "http://localhost:5000/api/";

class Register extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        registered: false
    };

    signUp = () => {
        if (!this.state.username || !this.state.password || !this.state.password2) {
            console.log("Not Provided");
            document.getElementById("error").innerText = "Username and password fields are required"
            return;
        }
        if (this.state.password !== this.state.password2) {
            console.log("Password must be the same");
            document.getElementById("error").innerText = "Password must be the same"
            return;
        }
        console.log("Signing up")
        fetch(AUTH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(r => {
                if (r.ok) {
                    console.log("Registrato!");
                    localStorage.clear()
                    this.setState({ registered: true })
                }
                return r.json()
            }).then(b => {
                console.log(b)
                if (b.msg) {
                    document.getElementById("error").innerText = b.msg
                }
            })
    }


    render() {
        if (this.state.registered) {
            return (
                <Redirect push to={{
                    pathname: "/login",
                    state: {
                        username: this.state.username,
                        password: this.state.password
                    }
                }}
                />
            )
        }
        return (
            <div>
                <img id="logo" src={logo} alt="" />
                <p>

                    <input
                        className="input"
                        placeholder="username"
                        type="text"
                        required
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                </p>
                <p>

                    <input
                        className="input"
                        placeholder="password"
                        type="password"
                        required
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </p>
                <p>

                    <input
                        className="input"
                        placeholder="confirm password"
                        type="password"
                        required
                        onChange={e => this.setState({ password2: e.target.value })}
                    />
                </p>
                <p id="error"></p>
                <img onClick={this.signUp} id="login_button" src={register_btn} alt="" />
            </div>
        );
    }
}

export default Register;
