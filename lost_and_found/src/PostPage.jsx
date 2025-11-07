import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // 读取旧数据
    const oldFeed = JSON.parse(localStorage.getItem("feed") || "[]");

    // 创建新 post
    const newPost = { id: Date.now(), text };

    // 更新并保存
    const updatedFeed = [newPost, ...oldFeed];
    localStorage.setItem("feed", JSON.stringify(updatedFeed));

    // 返回主页
    navigate("/");
  }

  return (
    <div className="card" style={{ padding: "2rem" }}>
      <div className="cardStyle">
        <h4>Report your missing item</h4>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter item details..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", height: "100px" }}
          />
          <br />
          <button type="submit" className="btnStyle">
            Submit
          </button>
        </form>
        <button className="btnStyle" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
