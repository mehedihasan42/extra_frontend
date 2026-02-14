import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoPaperAirplane } from "react-icons/go";
import { RxUpdate } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { savePost, unsavePost } from "../api/saveApi";
import API from "../api/api";

export default function Save() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editTexts, setEditTexts] = useState({});
  const [saved, setSaved] = useState(false);


  useEffect(() => {
    API.get("http://localhost:8000/content/save/")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.error(err.response?.data || err.message));
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await API.post(`/content/likes/${postId}/`);

      setPosts(posts =>
        posts.map(item =>
          item.post.id === postId
            ? {
              ...item,
              post: {
                ...item.post,
                total_likes: res.data.total_likes
              },
              is_liked: res.data.liked
            }
            : item
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

  const handleSave = async (postId, isSaved) => {
    try {
      if (!isSaved) {
        await savePost(postId);  // pass post.id here
      } else {
        await unsavePost(postId); // same
      }

      setPosts(prev =>
        prev.map(item =>
          item.post.id === postId  // compare post.id, not save id
            ? { ...item, post: { ...item.post, is_saved: !isSaved } }
            : item
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {posts.map(item => (
        <div key={item.id} className="card bg-base-100 w-96 shadow-xl border-2 border-gray-300 p-4 mx-auto my-2">
          <div className="card-body">
            <h2 className="card-title">{item.post.user}</h2>
            <p>{item.post.caption}</p>
          </div>
          <figure>
            <img
              className="h-96 w-80"
              src={item.post.photo}
              alt="Shoes" />
          </figure>
          <div className="flex items-center gap-4 mt-4">
            <button onClick={() => handleLike(item.post.id)} className="btn btn-sm btn-primary flex items-center gap-1">
              <FaHeart /> {item.post.total_likes}
            </button>
            <div>
              {/* Comment Button */}
              <button
                className="btn"
                onClick={() => {
                  fetchComments(item.id);
                  document.getElementById(`modal_${item.post.id}`).showModal();
                }}
              >
                Comments: {item.total_comments}
              </button>
              <button
                onClick={() => handleSave(item.post.id, item.post.is_saved)}
                className='btn btn-sm ml-2'
              >
                {item.post.is_saved ? "Unsave" : "Save"}
              </button>
              {/* Modal */}
              <dialog id={`modal_${item.post.id}`} className="modal modal-bottom sm:modal-middle">
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
