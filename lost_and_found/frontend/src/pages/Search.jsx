import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { markResolved } from "../services/api.js";

export default function Search({ posts, setAllPosts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Filter posts by search term and type
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredFeed(
      posts.filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(lower) ||
          post.description.toLowerCase().includes(lower);
        const matchesType = typeFilter
          ? post.post_type.toLowerCase() === typeFilter
          : true;
        const notResolved = post.status !== "Resolved" && post.resolved !== 1 && post.resolved !== true;
        return matchesSearch && matchesType && notResolved;
      })
    );
  }, [searchTerm, typeFilter, posts]);

  const handleResolved = async (postId) => {
    await markResolved(postId);
    // App.jsx owns posts so we must set the array that App
    // owns to resolved too.
    setAllPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: "Resolved" } : p))
    );
  };

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
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Bottle">Bottle</option>
            <option value="Keys">Keys</option>
            <option value="Bag">Bag</option>
            <option value="Wallet">Wallet</option>
            <option value="Other">Other</option>
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
            filteredFeed.map((post) => (
              <CardPost
                key={post.id}
                post={post}
                viewMode="card"
                onResolved={handleResolved}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
