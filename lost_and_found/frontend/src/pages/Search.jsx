import { useState, useMemo } from "react";
import CardPost from "../components/CardPost";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { markResolved } from "../services/api.js";

export default function Search({ posts, setAllPosts, currentUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function isUnresolved(post) {
    return (
      post.status !== "Resolved" &&
      post.resolved !== true &&
      post.resolved !== 1
    );
  }

  function matchesSearch(post, searchQuery) {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  }

  function matchesType(post, selectedType) {
    if (!selectedType) return true;
    return post.post_type === selectedType;
  }

  function matchesCategory(post, selectedCategory) {
    if (!selectedCategory) return true;
    return post.category === selectedCategory;
  }

  function isPostVisible(post, filters) {
    return (
      matchesSearch(post, filters.searchQuery) &&
      matchesType(post, filters.selectedType) &&
      matchesCategory(post, filters.selectedCategory) &&
      isUnresolved(post)
    );
  }

  const visiblePosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    return posts.filter((post) =>
      isPostVisible(post, {
        searchQuery,
        selectedType,
        selectedCategory,
      })
    );
  }, [posts, searchQuery, selectedType, selectedCategory]);

  // Event handler
  const handleMarkResolved = async (postId) => {
    console.assert(postId != null, "postId must be provided");
    await markResolved(postId);

    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, status: "Resolved" } : post
      )
    );
  };

  // Render
  return (
    <div className="searchContent">
      {/* Type filter */}
      <div className="filtersWrapper">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Search result */}
      <div className="browseWrapper">
        {visiblePosts.length === 0 ? (
          <div>No posts found</div>
        ) : (
          visiblePosts.map((post) => (
            <CardPost
              key={post.id}
              post={post}
              viewMode="card"
              onResolved={handleMarkResolved}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}
