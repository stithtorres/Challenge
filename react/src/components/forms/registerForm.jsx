import React from "react";
import axios from 'axios';
import Joi from "joi-browser";
import Form from "../common/form";
import {toast} from 'react-toastify';

// endpoint for my backend user create
const apiEndPoint = "http://localhost:9000/api/users/";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = async () => {
    // Call the server
    const {name,email,password} = this.state.data
    const obj = { name, email, password };
    try{
      await axios.post(apiEndPoint, obj);
      toast.success("User successfully created");
      this.props.history.push('/');
    }catch(ex){
      toast.error("CYou cannot register, may you are already registered");
    }
    
    //do inform success;
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
