import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../images/home.svg";
import { ReactComponent as SearchIcon } from "../images/search.svg";
import { ReactComponent as PostIcon } from "../images/post.svg";
import { ReactComponent as ProfileIcon } from "../images/profile.svg";

export default function Navbar({ onPostClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleProfileClick = () => {
    if (!userId) {
      navigate("/login");
    } else {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {/* Browse */}
        <li>
          <button
            className={location.pathname === "/browse" ? "active" : ""}
            onClick={() => navigate("/browse")}
          >
            <HomeIcon width={40} height={40} />
          </button>
        </li>

        {/* Search */}
        <li>
          <button
            className={location.pathname === "/search" ? "active" : ""}
            onClick={() => navigate("/search")}
          >
            <SearchIcon width={40} height={40} />
          </button>
        </li>

        {/* Post */}
        <li>
          <button className="icon-button" onClick={onPostClick}>
            <PostIcon width={40} height={40} />
          </button>
        </li>

        {/* Profile */}
        <li>
          <button className={location.pathname.startsWith("/profile") ? "active" : ""} onClick={handleProfileClick}>
            <ProfileIcon width={40} height={40} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
