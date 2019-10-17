import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

// my components
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

//forms components
import LoginForm from "./components/forms/loginForm";
import RegisterForm from "./components/forms/registerForm";
import Logout from "./components/logout";

//css
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    if (sessionStorage.getItem("sessionMessage")) {
      toast(sessionStorage.getItem("sessionMessage"));
      sessionStorage.removeItem("sessionMessage");
    }
    try {
      const token = localStorage.getItem("JSONWebToken");
      const user = jwtDecode(token);
      this.setState({ user });
    } catch (error) {}
  }


  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies" component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }

}



export default App;
