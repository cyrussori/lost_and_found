import "../css/browse.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";
import { getPosts } from "../services/api.js";

// TODO: Context, for global posts.
// All onclick => show all posts
// Lost onclick => Show lost posts
// Found onclick => Show found posts
export default function Browse() {
  const [feed, setFeed] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function fetchFeed() {
      const posts = await getPosts();
      setFeed(posts);
    }
    fetchFeed();
  }, []);

  const filteredFeed =
    filterType === "all"
      ? feed
      : feed.filter((post) => post.type === filterType);

  return (
    <>
      <Navbar />
      {/*Header*/}
      <div className="browseHWrapper">
        <div className="browseHeader">
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
