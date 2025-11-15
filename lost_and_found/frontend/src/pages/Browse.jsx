import "../css/browse.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";
import { getPosts } from "../services/api.js";

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
          <button onClick={() => setFilterType("all")}>All</button>
          <button onClick={() => setFilterType("lost")}>Lost</button>
          <button onClick={() => setFilterType("found")}>Found</button>
        </div>
      </div>

      <div className="browseWrapper">
        {filteredFeed.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}