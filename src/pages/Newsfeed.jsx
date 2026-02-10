import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import API from "../api/api";

export default function Newsfeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/newsfeed/").then(res => setPosts(res.data));
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await API.post(`/like/${postId}/`);
      // Refresh posts after like/unlike
      const updatedPosts = posts.map(post => {
        if(post.id === postId){
          if(res.data.details === "Unliked") post.total_likes -= 1;
          else post.total_likes += 1;
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Newsfeed</h1>
      {posts.map(post => (
        <div key={post.id} className="card w-full bg-base-100 shadow-lg mb-4">
          <div className="card-body">
            <h2 className="card-title">{post.user}</h2>
            <p>{post.caption}</p>
            <img src={post.photo} alt="Post" className="rounded-lg my-2" />
            <div className="flex items-center gap-4">
              <button onClick={() => handleLike(post.id)} className="btn btn-sm btn-primary flex items-center gap-1">
                <FaHeart /> {post.total_likes}
              </button>
              <span>Comments: {post.total_comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
