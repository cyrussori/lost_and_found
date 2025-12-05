import { Link } from "react-router-dom";
import { useState } from "react";
import { signup } from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null); // TODO: Catch error thrown from api.js
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault(); // prevents refresh
    setErr(null);
    setLoading(true);
    if (!signupData.name) {
      setErr("Name is required");
      setLoading(false);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(signupData.email)) {
      setErr("Email is invalid. Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (signupData.password.length < 6) {
      setErr("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    try {
      const userData = await signup(signupData);
      console.log(userData);
      /*
      if (!userData) {
        //assume email already taken
        setErr("Email already in use. Try logging in.");
      }
      const validUserData = () => {
        return userData.token && (userData.user?.id || userData.userId);
      };
      */
      nav("/login");
    } catch (error) {
      console.error("Erroneous data: ", error);
      if (error.message && error.message.includes("Email already registered")) {
        setErr("Email already in use. Try logging in."); // <--- Your desired message
      } else {
        setErr("Signup failed. Please try again.");
      }
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
            ></input>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              onChange={onChange}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
            ></input>
            {err && <div className="errorMessage">{err}</div>}
            <input
              className="loginSubmit"
              type="submit"
              value="Continue"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}
