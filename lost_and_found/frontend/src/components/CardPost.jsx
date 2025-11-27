import { useState } from "react";
import { markResolved } from "../services/api.js";
import { ReactComponent as LocIcon } from '../images/loc.svg'
import { ReactComponent as RepIcon } from '../images/reply.svg'
import { ReactComponent as ViewIcon } from '../images/view.svg'
import { Link } from "react-router-dom";

export default function CardPost({ post, viewMode = "column", isAccountOwner = false, }) {
  const timeAgo = "2h";
  const [isResolved, setIsResolved] = useState(post.resolved === 1);
  const mode = viewMode === "card" ? "cardPostCard" : "cardPostCol";

  const handleResolved = async () => {
    try {
      await markResolved(post.id);
      setIsResolved(true);
    } catch (error) {
      console.error("Erroneous data: ", error);
    }
  };

  return (
    <div className={`cardPost ${mode}`}>
      <div className="cardStyle">
        <div className="cardHeader">
          <div className="userInfo">
            <div className="avatar" />
            <div>
              <div className="userName"><Link to={`/profile/${post.user_id}`} className="profileLink">{post.user_name}</Link></div>
              <div className="timeStamp">· {timeAgo}</div>
            </div>
          </div>
          <button className="moreButton">⋯</button>
        </div>
        {isResolved ? <div className="resolved">Resolved</div> : <div className="category">{post.category}</div> }
        <div className="cardContent">
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          {post.address && (
            <div className="address">
              <LocIcon className="locIcon" width={20} height={15}></LocIcon>
              <span>{post.address}</span>
            </div>
          )}
        </div>
        {post.file_path && (
          <div className="mediaContainer">
            <img
              src={`http://localhost:5050/${post.file_path}`}
              alt="Lost item"
              className="postImage"
            />
          </div>
        )}
        <div className="actionBar">
          <button className="actionButton">
            <RepIcon className="repIcon" width={15} height={15}></RepIcon> Reply
          </button>
          {isAccountOwner && (
            <button className="actionButton returnedButton" onClick={handleResolved}>Mark as resolved</button>
          )}
          <button className="actionButton">
            <ViewIcon className="viewIcon" width={15} height={15}></ViewIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
