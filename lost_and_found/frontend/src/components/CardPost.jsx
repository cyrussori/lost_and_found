export default function CardPost({ post }) {
  return (
    <div className="cardPost">
      <div className="cardStyle">
        <h4>{post.title}</h4>
        <p>
          <strong>{post.category}</strong>
        </p>
        <p>{post.description}</p>
        <p>
          <em>{post.address}</em>
        </p>
        {post.file_path && (
          <img className="postImage"
            // The src now points to the full URL where the backend serves the image
            src={`http://localhost:5050/${post.file_path}`} 
            alt="Lost item"
          />
        )}
      </div>
    </div>
  );
}
