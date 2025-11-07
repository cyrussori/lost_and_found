import "../css/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({ "email": "", "password": ""});
  const [err, setErr] = useState(null); // TODO: Catch error thrown from api.js
  const [loading, setLoading] = useState(true); 
  const nav = useNavigate();

  const onChange = e => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
      e.preventDefault(); // prevents refresh
      setErr("");
      setLoading(true);
      try {
        //       Send request => call login()
        //       Store data in local storage
        //       nav to personal profile (dashboard from user story). 
        const userData = await login(loginData);
        console.log(userData);
        const validUserData = () => {
        return userData.token && userData.user?.id && userData.userId;
      }
      if (validUserData) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', userData.user?.id);
        localStorage.setItem('user', userData.userId);
      } else {
        throw new Error(`Data error`);
      }
        nav("/profile")
      } catch(error) {
        console.error("Erroneous data: ", error)
      } finally {
        setLoading(false);
      }
    }
    // TODO if (loading) {...}
  return (
    <>
      {/*Header*/}
      <div className="loginWrapper">
      <div className="loginCard">
        <h1>Lost & Found</h1>
        <form className="loginForm" action="" onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" onChange={onChange}></input>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" onChange={onChange}></input>
          <input className="loginSubmit" type="submit" value="Continue"></input>
        </form>
        <Link className="signupLink" to="/signup">Create an account</Link>
      </div>
      </div>
    </>
  );
}