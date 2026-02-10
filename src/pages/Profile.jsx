import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get("/profile-posts/");
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/create-post/", { caption, photo });
      setCaption("");
      setPhoto("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      {/* Create Post */}
      <div className="card bg-base-200 p-4 mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">Create Post</button>
        </form>
      </div>

      {/* Display User Posts */}
      {posts.map(post => (
        <div key={post.id} className="card w-full bg-base-100 shadow-lg mb-4">
          <div className="card-body">
            <h2 className="card-title">{post.user}</h2>
            <p>{post.caption}</p>
            <img src={post.photo} alt="Post" className="rounded-lg my-2" />
            <div className="flex items-center gap-4">
              <span>Likes: {post.total_likes}</span>
              <span>Comments: {post.total_comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
