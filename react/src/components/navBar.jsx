import React from "react";
import { Link, NavLink } from "react-router-dom";
import $ from 'jquery';

const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <Link className="navbar-brand" to="/">
        Challenge
      </Link>
      <button onClick={()=>toggleNavBar()} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"   >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
              <NavLink className="nav-item nav-link" to="/">
                <strong>{user.name}</strong>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

function toggleNavBar(){
    $("#navbarNavAltMarkup").toggle(500);
}

export default NavBar;
