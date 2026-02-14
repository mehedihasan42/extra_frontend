import React, { useEffect, useState } from "react";
import API from "../api/api";
import { FaHeart } from "react-icons/fa";
import { deletePost, updatePost } from "../api/post";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profile: "",
    bio: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get("/content/profile/");
    setPosts(res.data);
  };

  // 🔥 ImgBB Upload Function
  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=990065b5b45a25bb740e69adf495522a`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setPhoto(data.data.url); // Set ImgBB URL
    } catch (error) {
      console.log("Image upload error:", error);
    }

    setUploading(false);
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

  /* User profile APIs */
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

 const updateProfile = async () => {
    try {
      setUpdatingProfile(true);
      let profileUrl = formData.profile;

      // If a new file is selected, upload to ImgBB
      if (formData.profile instanceof File) {
        const imageData = new FormData();
        imageData.append("image", formData.profile);
        const res = await fetch(
          "https://api.imgbb.com/1/upload?key=990065b5b45a25bb740e69adf495522a",
          { method: "POST", body: imageData }
        );
        const data = await res.json();
        profileUrl = data.data.url;
      }

      const res = await API.patch("/user/profile/", {
        profile: profileUrl,
        bio: formData.bio,
      });

      setProfile(res.data);
      Swal.fire({ icon: "success", title: "Profile updated!", timer: 1200, showConfirmButton: false });
      document.getElementById("my_modal_2").close();
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Failed to update profile!");
    } finally {
      setUpdatingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (id) => {
    try {
      await updatePost(id, { caption });
      fetchPosts();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Update failed",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deletePost(id);
        await fetchPosts();

        await Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success"
        });

      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Delete failed",
          icon: "error"
        });
      }
    }
  };


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
              type="file"
              accept="image/*"
              className="input input-bordered w-full my-2"
              onChange={(e) =>
                setFormData({ ...formData, profile: e.target.files[0] })
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
            disabled={updatingProfile}
          >
            {updatingProfile ? "Updating..." : "Save"}
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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />

          {/* Uploading indicator */}
          {uploading && (
            <span className="text-sm text-blue-500">
              Uploading image...
            </span>
          )}

          {/* Image Preview */}
          {photo && (
            <img
              src={photo}
              alt="preview"
              className="h-96 w-80"
            />
          )}

          <button type="submit" className="btn btn-primary">
            Create Post
          </button>
        </form>
      </div>

      {/* Display User Posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="card bg-base-100 w-96 shadow-xl border-2 border-gray-300 p-4 mx-auto mb-6"
        >
          <div className="card-body">
            <h2 className="card-title">{post.user}</h2>
            <p>{post.caption}</p>
          </div>
          <figure>
            <img className="h-96 w-80" src={post.photo} alt="post" />
          </figure>
          <div className="flex items-center gap-4 p-4">
            <span>Likes: {post.total_likes}</span>
            <span>Comments: {post.total_comments}</span>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-xs btn-outline" onClick={() => document.getElementById(post.id).showModal()}>Edit</button>
            <dialog id={post.id} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <input
                  type="text"
                  // value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  defaultValue={post.caption}
                />
                <figure className="w-48 mx-auto mb-4">
                  <img className="h-80 w-96" src={post.photo} alt="post" />
                </figure>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm m-2 btn-primary" onClick={() => handleUpdate(post.id)}>Update</button>
                    <button className="btn btn-sm">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <button onClick={() => handleDelete(post.id)} className="btn btn-xs btn-outline">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
