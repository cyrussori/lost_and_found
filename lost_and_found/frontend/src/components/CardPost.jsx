import { ReactComponent as LocIcon } from '../images/loc.svg'
import { ReactComponent as RepIcon } from '../images/reply.svg'
import { ReactComponent as ViewIcon } from '../images/view.svg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CardPost({ post, viewMode = "column", isAccountOwner = false, onResolved, clickable = true}) {
  const timeAgo = "2h";
  const isResolved = post.resolved === 1 || post.resolved === true;
  const mode = viewMode === "card" ? "cardPostCard" : "cardPostCol";
  const nav = useNavigate();  
  const handleResolved = async () => {
      if (!onResolved) return;
      await onResolved(post.id);
  };

  const handleClick = () => {
    if(!clickable) return;
    nav(`/posts/${post.id}`)
  }

  return (
    <div className={`cardPost ${mode}`}>
      <article className="post" onClick={handleClick}>
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
        {isResolved ? <div className="resolved">Returned</div> : <div className="category">{post.category}</div> }
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
          {
            /*
          <button className="actionButton">
            <RepIcon className="repIcon" width={15} height={15}></RepIcon> Reply
          </button>
            */
          }
          {isAccountOwner && !isResolved && (
            <button className="actionButton returnedButton" onClick={handleResolved}>Mark as returned</button>
          )}
        </div>
      </div>
      </article>
    </div>
  );
}
