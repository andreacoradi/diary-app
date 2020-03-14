import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Diary from "./Diary";

//import "./App.css";

export default function App() {
    return (

        <Router>
            <div>

                <Route exact path="/">
                    <h1>Home</h1>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/login" onClick={e => {
                                localStorage.clear()
                            }}>Logout</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/diary" component={Diary} />

            </div>
        </Router >
    );
}
