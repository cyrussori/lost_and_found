import { useState } from "react";
import { Link } from "react-router-dom";
import CardPost from "../components/CardPost";
import Card from "../components/Card";
import "../css/main.css";

export default function Welcome() {
  const [feed, setFeed] = useState([]);
  const [card, setCard] = useState(false);

  function handlePost() {
    setCard(true);
  }

  function handleReport(post) {
    setFeed((prev) => [post, ...prev]);
    setCard(false);
  }

  return (
    <>
      <div className="wrapper">
        <h1>LOGO</h1>
        <div className="linkBar">
          <button className="btnStyle"> Lost </button>
          <button className="btnStyle"> Found </button>
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
          <button className="btnStyle" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>

      <div className="feed">
        {feed.map((item) => (
          <CardPost key={item.id} post={item} />
        ))}
      </div>

      {card && <Card onClose={() => setCard(false)} onReport={handleReport} />}
    </>
  );
}
