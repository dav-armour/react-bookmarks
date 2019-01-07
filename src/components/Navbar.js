import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav>
      {props.token ? (
        <button onClick={props.onLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
