import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

const AUTH_URL = "https://jwt-auth-deno.herokuapp.com/";

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
            logged: false
        };
    }

    componentDidMount = () => {
        if (this.props.location.state) {
            console.log(this.props.location.state)
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
            return;
        }
        let API_URL = `users/${this.state.username}`
        fetch(AUTH_URL + API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
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
                    console.log(typeof (jwt))
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
        let username;
        let password;
        if (this.props.location.state) {
            username = this.props.location.state.username
            password = this.props.location.state.password
        }


        return (

            <div>
                <h1>Diary App</h1>
                <h2>Login</h2>
                <p>Username</p>
                <input
                    value={username}
                    type="text"
                    required
                    onChange={e => this.setState({ username: e.target.value })}
                />
                <p>Password</p>
                <input
                    value={password}
                    type="password"
                    required
                    onChange={e => this.setState({ password: e.target.value })}
                />
                <br />
                <p id="error" style={styles}></p>
                <br />
                <button onClick={this.signIn}>Sign in</button>
                <p>Not registered? <Link to="/register">Register</Link></p>
            </div>
        );
    }
}
const styles = {
    color: 'red',
}

export default Login;
