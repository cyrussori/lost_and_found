import { Link } from "react-router-dom";
import { useState } from "react";
import { signup } from '../services/api.js';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({ "name": "", "email": "", "password": "" });
  const [err, setErr] = useState(null); // TODO: Catch error thrown from api.js
  const [loading, setLoading] = useState(true); 
  const nav = useNavigate();

  const onChange = e => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); // prevents refresh
    setErr("");
    setLoading(true);
    try {
      /* TODO
      if (signupData.password.length() < n) { // PW at least n chars long
        // Return div "PW at least n chars long"
      }
      */
      const userData = await signup(signupData);
      console.log(userData);
      // Use localStorage for now; Stores signup data. 
      // After, everything works => use cookies. 
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
      // Go to login
      nav("/login");
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
        <p>Sign up to continue</p>
        <form className="loginForm" action="" onSubmit={handleSubmit}>
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" onChange={onChange}></input>
          <label for="name">Full name</label>
          <input type="text" id="name" name="name" placeholder="Enter full name" onChange={onChange}></input>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" onChange={onChange}></input>
          <input className="loginSubmit" type="submit" value="Continue"></input>
        </form>
      </div>
      </div>
    </>
  );
}