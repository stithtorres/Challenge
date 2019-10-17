import React from "react";
import axios from 'axios';
import Joi from "joi-browser";
import Form from "../common/form";
import {toast} from 'react-toastify';

// endpoint for my backend loggin
const apiEndPoint = "http://localhost:9000/api/auth/";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const {email,password} = this.state.data
    const obj = {email, password};
    try{
      const { data } = await axios.post(apiEndPoint, obj);
      localStorage.setItem('JSONWebToken', data.data);
      sessionStorage.setItem('sessionMessage','Welcome!');
      console.log(data.data);
      window.location = "/";
    }catch(e){
      toast.error("An error was ocurred. ("+e.response.data.message+")");
    }
    
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
