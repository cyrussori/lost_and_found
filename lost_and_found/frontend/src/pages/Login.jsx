import "../css/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  
  return (
    <>
      {/*Header*/}
      <div className="loginWrapper">
      <div className="loginCard">
        <h1>Lost & Found</h1>
        <form className="loginForm" action="">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email"></input>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password"></input>
          <input className="loginSubmit" type="submit" value="Continue"></input>
        </form>
        <Link className="signupLink" to="/signup">Create an account</Link>
      </div>
      </div>

    </>
  );
}