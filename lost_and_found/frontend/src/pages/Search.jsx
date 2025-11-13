import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import "../css/search.css";
import "../css/cardPost.css";

const MOCK_FEED = [
  {
    id: 1,
    title: "Lost backpack",
    description: "Black backpack in library",
    category: "Bag",
    type: "lost",
    address: "Library",
    contact: "123",
  },
  {
    id: 2,
    title: "Found keys",
    description: "Keys on cafeteria table",
    category: "Keys",
    type: "found",
    address: "Cafeteria",
    contact: "456",
  },
  {
    id: 3,
    title: "Lost umbrella",
    description: "Blue umbrella near gym",
    category: "Other",
    type: "lost",
    address: "Gym",
    contact: "789",
  },
];

export default function Search() {
  const [feed] = useState(MOCK_FEED);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeed, setFilteredFeed] = useState(MOCK_FEED);

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
        {/* 搜索栏 */}
        <div className="searchHWrapper">
          <SearchIcon style={{ width: 30, height: 30 }} />
          <input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 搜索结果 */}
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
