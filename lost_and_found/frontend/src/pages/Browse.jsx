import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { markResolved } from "../services/api";

export default function Browse({ posts, setPosts, currentUser }) {
  const [filterType, setFilterType] = useState("all");

  const demoPosts = [
    {
      id: 1,
      user_id: 123,
      user_name: "Alice",
      title: "Lost Wallet",
      description: "Black wallet",
      category: "Wallet",
      post_type: "Lost",
      address: "123 Main St",
      status: "Lost",
      file_path: null,
    },
    {
      id: 2,
      user_id: 456,
      user_name: "Bob",
      title: "Found Keys",
      description: "Set of car keys",
      category: "Keys",
      post_type: "Found",
      address: "456 Elm St",
      status: "Found",
      file_path: null,
    },
  ];

  const allPosts = posts && posts.length > 0 ? posts : demoPosts;

  const filteredFeed =
    filterType === "all"
      ? allPosts
      : allPosts.filter((post) => post.post_type === filterType);

  const handleResolved = async (postId) => {
    try {
      await markResolved(postId);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "Resolved" } : p))
      );
    } catch (err) {
      console.error("Failed to mark as resolved:", err);
    }
  };

  return (
    <>
      <div className="browseContent">
        <div className="browseHWrapper">
          <div className="browseHeader">
            <button onClick={() => setFilterType("all")}>All</button>
            <button onClick={() => setFilterType("Lost")}>Lost</button>
            <button onClick={() => setFilterType("Found")}>Found</button>
          </div>
        </div>

        <div className="browseWrapper">
          {filteredFeed.map((post) => (
            <CardPost
              key={post.id}
              post={post}
              viewMode="card"
              isAccountOwner={false}
              onResolved={handleResolved}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </>
  );
}
