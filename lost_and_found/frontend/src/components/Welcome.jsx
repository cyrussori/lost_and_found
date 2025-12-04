import { Link } from "react-router-dom";
import "../css/main.css";
import logo from "../images/logo.png";

export default function Welcome() {
  return (
    <div className="welcomeScrollContainer">
      <section className="hero">
        <div className="wrapper">
          <img src={logo} alt="Lost and Found Logo" className="siteLogo" /> 
          <div className="linkBar">
            <Link to="/login">
              <button className="btnStyle">Login</button>
            </Link>
            <Link to="/browse">
              <button className="btnStyle">Get Started</button>
            </Link>
          </div>
        </div>

        <div className="laf">
          <div className="lafText">
            <h1>Join thousands of users finding their lost items every day.</h1>
            <h1>Lost something? Found something? We help Bruin items find their way home.</h1>
            <div className="scrollArrow">&#x2193;</div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="featureCards">
          <div className="featureCard">
            <h3>Search Lost Items</h3>
            <p>Easily find items reported lost by the community.</p>
          </div>
          <div className="featureCard">
            <h3>Claim Found Items</h3>
            <p>Quickly report and claim items you have found.</p>
          </div>
          <div className="featureCard">
            <h3>Community Support</h3>
            <p>Connect with other users and help return items.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
