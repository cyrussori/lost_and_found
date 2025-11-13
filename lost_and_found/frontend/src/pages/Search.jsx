import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import "../css/search.css";
import "../css/cardPost.css";
import { getPosts } from "../services/api.js";

export default function Search() {
  const [feed, setFeed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeed, setFilteredFeed] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      setFeed(posts);
      setFilteredFeed(posts);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredFeed(
      feed.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.description.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, feed]);

  return (
    <>
      <Navbar />
      <div className="searchContent">
        {/* Search box */}
        <div className="searchHWrapper">
          <SearchIcon style={{ width: 30, height: 30 }} />
          <input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search result */}
        <div className="browseWrapper">
          {filteredFeed.length === 0 ? (
            <div>No posts found</div>
          ) : (
            filteredFeed.map((post) => <CardPost key={post.id} post={post} />)
          )}
        </div>
      </div>
    </>
  );
}
