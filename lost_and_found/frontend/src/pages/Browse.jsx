import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { markResolved } from "../services/api"

export default function Browse({ posts, setPosts }) {
  const [filterType, setFilterType] = useState("all");

  const filteredFeed =
    filterType === "all"
      ? posts
      : posts.filter((post) => post.post_type === filterType);
  
  const handleResolved = async (postId) => {
    await markResolved(postId);
    setPosts(prev => 
      prev.map(p => p.id === postId ? { ...p, status: "Resolved" } : p)
    );
  };

  return (
    <>
      {/*Header*/}
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
          <CardPost key={post._id} post={post} viewMode="card" isAccountOwner={false} onResolved={handleResolved}/>
        ))}
      </div>
      </div>
    </>
  );
}