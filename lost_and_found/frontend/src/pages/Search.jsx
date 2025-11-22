import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { getPosts } from "../services/api.js";

export default function Search() {
  const [feed, setFeed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      setFeed(posts);
      setFilteredFeed(posts);
    }
    fetchPosts();
  }, []);

  // Filter posts by search term and type
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredFeed(
      feed.filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(lower) ||
          post.description.toLowerCase().includes(lower);
        const matchesType = typeFilter ? post.type === typeFilter : true;
        return matchesSearch && matchesType;
      })
    );
  }, [searchTerm, typeFilter, feed]);

  return (
    <>
      <div className="searchContent">
        {/* Type filter */}
        <div className="filtersWrapper">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

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
