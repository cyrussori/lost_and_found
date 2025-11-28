import { Link } from "react-router-dom";
import "../css/main.css";

export default function Welcome() {
  return (
    <>
      <div className="wrapper">
        <h1>LOGO</h1>
        <div className="linkBar">
          <Link to="/browse">
            <button>Browse Posts</button>
          </Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="laf">
        <div>
          <h1>Lost and Found</h1>
          <p>
            Some random text about the website. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aenean nunc elit, malesuada ac lorem
            non, eleifend vulputate sapien.
          </p>
        </div>
        <div>
          <div className="imagetemp">temp for img</div>
        </div>
      </div>
    </>
  );
}
