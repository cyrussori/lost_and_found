import { Link } from "react-router-dom";
import "../css/main.css";

export default function Welcome() {
  return (
    <div className="welcomeScrollContainer">
      <section className="hero">
        <div className="wrapper">
          <h1>LOGO</h1>
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
            <h1>Lost and Found</h1>
            <p>Join thousands of users finding their lost items every day.</p>
            <div className="scrollArrow">&#x2193;</div>
          </div>
          <div className="imagetemp">temp for img</div>
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
