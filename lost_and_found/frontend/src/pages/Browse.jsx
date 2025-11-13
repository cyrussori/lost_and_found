import "../css/browse.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";

// TODO: Context, for global posts.
// All onclick => show all posts
// Lost onclick => Show lost posts
// Found onclick => Show found posts
export default function Browse() {
  const [feed, setFeed] = useState([]);

  return (
    <>
      <Navbar />
      {/*Header*/}
      <div className="browseHWrapper">
        <div className="browseHeader">
          <input
            type="text"
            placeholder="Search posts..."
            className="searchInput"
            onChange={(e) => console.log(e.target.value)}
          />
          <button>All</button>
          <button>Lost</button>
          <button>Found</button>
        </div>
      </div>
      <div className="browseWrapper">
        <div className="browseCard"></div>
      </div>
    </>
  );
}
