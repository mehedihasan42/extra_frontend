import React, { useEffect, useState } from "react";
import API from "../api/api";
import { FaHeart } from "react-icons/fa";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");
   const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    profile: "",
    bio: "",
  });

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get("/content/profile/");
    setPosts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/content/create_post/", { caption, photo });
      setCaption("");
      setPhoto("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  /*User profile apis*/
    const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile/");
      setProfile(res.data);

      setFormData({
        profile: res.data.profile || "",
        bio: res.data.bio || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Update Profile
  const updateProfile = async () => {
    try {
      const res = await API.patch("/user/profile/", formData);
      setProfile(res.data);
      alert("Profile updated successfully!");
      document.getElementById("my_modal_2").close();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
       <div className="flex flex-col items-start p-6">

      {/* Profile Info */}
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img
              src={
                profile?.profile ||
                "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              }
              alt="avatar"
            />
          </div>
        </div>

        <div className="m-4 font-bold">
          <h1>{user?.username}</h1>
          <p className="font-normal">{profile?.bio}</p>
        </div>

        <button
          className="btn btn-xs btn-primary"
          onClick={() =>
            document.getElementById("my_modal_2").showModal()
          }
        >
          Update Profile
        </button>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Profile</h3>

          <input
            type="text"
            placeholder="Profile Image URL"
            className="input input-bordered w-full my-2"
            value={formData.profile}
            onChange={(e) =>
              setFormData({ ...formData, profile: e.target.value })
            }
          />

          <textarea
            placeholder="Bio"
            className="textarea textarea-bordered w-full my-2"
            maxLength={150}
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />

          <button
            className="btn btn-primary mt-2"
            onClick={updateProfile}
          >
            Save Changes
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
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
        <div className="card bg-base-100 w-6/12 shadow-sm p-4 mx-auto">
          <div className="card-body">
            <h2 className="card-title">{post.user}</h2>
            <p>{post.caption}</p>
          </div>
          <figure>
            <img
              src={post.photo}
              alt="Shoes" />
          </figure>
          <div className="flex items-center gap-4">
            <span>Likes: {post.total_likes}</span>
            <span>Comments: {post.total_comments}</span>
          </div>

        </div>
      ))}
    </div>
  );
}
