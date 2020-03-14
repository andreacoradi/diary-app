import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Diary from "./Diary";
import "./App.css"

import Logo from "./logo.svg"
import LoginBTN from "./login_btn.svg"
import LogoutBTN from "./logout_btn.svg"
import RegisterBTN from "./register_btn.svg"

//import "./App.css";

export default function App() {
    return (

        <Router>
            <div>

                <Route exact path="/">
                    <img id="logo" src={Logo} alt="" />

                    <p>
                        <Link to="/login"><img className="btn" src={LoginBTN} alt="" /></Link>
                    </p>



                    <p>
                        <Link to="/login" onClick={e => {
                            localStorage.clear()
                        }}><img id="logout" className="btn" src={LogoutBTN} alt="" /></Link>
                    </p>


                    <p>
                        <Link to="/register"><img className="btn" src={RegisterBTN} alt="" /></Link>
                    </p>


                </Route>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/diary" component={Diary} />

            </div>
        </Router >
    );
}
