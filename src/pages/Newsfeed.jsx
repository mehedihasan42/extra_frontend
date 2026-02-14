import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import API from "../api/api";
import axios from "axios";
import { GoPaperAirplane } from "react-icons/go";
import { RxUpdate } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { savePost, unsavePost } from "../api/saveApi";
import { Link } from "react-router";

export default function Newsfeed() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("access_token");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editTexts, setEditTexts] = useState({});
  // const [saved, setSaved] = useState(false);


  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   API.get("/content/newsfeed/").then(res => setPosts(res.data));
  // }, []);

  useEffect(() => {
    // API.get("/content/newsfeed/")
    //   .then((res) => {
    //     console.log(res.data);
    //     setPosts(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err.response?.data || err.message);
    //   });
    axios.get("http://localhost:8000/content/newsfeed/", {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err.response?.data || err.message));
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await API.post(`/content/likes/${postId}/`);

      setPosts(posts =>
        posts.map(post =>
          post.id === postId
            ? {
              ...post,
              total_likes: res.data.total_likes,
              is_liked: res.data.liked
            }
            : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const res = await API.get(`/content/comments/?post_id=${postId}`);
      setComments(res.data);
      setSelectedPostId(postId); // store current post id
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };


  const handleSubmit = async () => {
    if (!commentText.trim() || !selectedPostId) return;

    try {
      await API.post("/content/comments/", {
        post_id: selectedPostId,
        text: commentText,
      });

      setCommentText("");
      fetchComments(selectedPostId); // refresh comments
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update a comment
  const updateComment = async (commentId, updatedText) => {
    try {
      const res = await API.patch(`/comments/${commentId}/`, {
        text: updatedText, // field you want to update
      });

      console.log("Comment updated:", res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to update comment:", err.response?.data || err.message);
    }
  };

  // Delete a comment
  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}/`);
      console.log("Comment deleted successfully");
    } catch (err) {
      console.error("Failed to delete comment:", err.response?.data || err.message);
    }
  };


  const handleSave = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post.is_saved) {
        await savePost(postId);
      } else {
        await unsavePost(postId);
      }

      // Update posts array
      setPosts(posts.map(p =>
        p.id === postId ? { ...p, is_saved: !p.is_saved } : p
      ));
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };
  

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card bg-base-100 w-96 shadow-xl border-2 border-gray-300 p-4 mx-auto my-2">
          <div className="card-body">
            <h2 className="card-title">{post.user}</h2>
            <p>{post.caption}</p>
          </div>
          <figure>
            <img
            className="h-96 w-80"
              src={post.photo}
              alt="Shoes" />
          </figure>
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => handleLike(post.id)} className="btn btn-sm btn-primary flex items-center gap-1">
              <FaHeart /> {post.total_likes}
            </button>
            <div>
              {/* Comment Button */}
              <button
                className="btn"
                onClick={() => {
                  fetchComments(post.id);
                  document.getElementById(`modal_${post.id}`).showModal();
                }}
              >
                Comments: {post.total_comments}
              </button>
              <button
                onClick={() => handleSave(post.id)}
                className={`btn btn-sm ml-2`}
              >
                {post.is_saved ? "Unsave" : "Save"}
              </button>
              {/* Modal */}
              <dialog id={`modal_${post.id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-4">Comments</h3>
                  {/* Comments List */}
                  <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                    {comments.length === 0 ? (
                      <p>No comments yet</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="bg-base-200 p-2 rounded">
                          <p className="text-sm font-semibold">{comment.user_username}</p>

                          {/* Conditional rendering: show textarea only if in edit mode */}
                          {editTexts[comment.id]?.isEditing ? (
                            <textarea
                              className="textarea textarea-sm mb-2"
                              value={editTexts[comment.id].text}
                              onChange={(e) =>
                                setEditTexts((prev) => ({
                                  ...prev,
                                  [comment.id]: { ...prev[comment.id], text: e.target.value },
                                }))
                              }
                            />
                          ) : (
                            <p className="mb-2">{comment.text}</p>
                          )}

                          {/* <details className="dropdown flex">
                            <summary className="btn m-1"><BsThreeDotsVertical /></summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-28 p-2 shadow-sm">
                              <li>
                                {editTexts[comment.id]?.isEditing ? (
                                  <button
                                    onClick={async () => {
                                      await updateComment(comment.id, editTexts[comment.id].text);
                                      setEditTexts((prev) => ({
                                        ...prev,
                                        [comment.id]: { ...prev[comment.id], isEditing: false },
                                      }));
                                      fetchComments(selectedPostId);
                                    }}
                                    className="btn btn-sm btn-warning"
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setEditTexts((prev) => ({
                                        ...prev,
                                        [comment.id]: { text: comment.text, isEditing: true },
                                      }));
                                    }}
                                    className="btn btn-sm btn-warning"
                                  >
                                    Update
                                  </button>
                                )}
                              </li>

                              <li>
                                <button
                                  onClick={async () => {
                                    await deleteComment(comment.id);
                                    fetchComments(selectedPostId);
                                  }}
                                  className="btn btn-sm btn-error"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </details> */}
                        </div>
                      ))
                    )}

                  </div>

                  {/* Input Box */}
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Write a comment..."
                      className="textarea textarea-sm"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <button onClick={handleSubmit} className="btn btn-primary">
                      <GoPaperAirplane className="text-2xl font-bold" />
                    </button>

                  </div>

                  {/* Close Button */}
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
