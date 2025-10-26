import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <>
      {/*Header*/}
      <div className="loginWrapper">
      <div className="loginCard">
        <h1>Lost & Found</h1>
        <p>Sign up to continue</p>
        <form className="loginForm" action="">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email"></input>
          <label for="fullName">Full name</label>
          <input type="text" id="fullName" name="fullName" placeholder="Enter full name"></input>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"></input>
          <input className="loginSubmit" type="submit" value="Continue"></input>
        </form>
      </div>
      </div>
    </>
  );
}