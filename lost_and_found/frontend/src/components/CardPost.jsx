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
          <em>{post.location}</em>
        </p>
        {post.image && (
          <img
            src={URL.createObjectURL(post.image)}
            alt="Lost item"
            style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
}
