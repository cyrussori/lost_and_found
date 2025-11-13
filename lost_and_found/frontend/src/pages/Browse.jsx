import "../css/browse.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardPost from "../components/CardPost";

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

// TODO: Context, for global posts.
// All onclick => show all posts
// Lost onclick => Show lost posts
// Found onclick => Show found posts
export default function Browse() {
  const [feed] = useState(MOCK_FEED);
  const [filterType, setFilterType] = useState("all");

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
