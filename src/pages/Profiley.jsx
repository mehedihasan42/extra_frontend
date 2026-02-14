import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/");
      setProfile(res.data);

      setFormData({
        bio: res.data.bio || "",
        location: res.data.location || "",
      });

    } catch (error) {
      console.log("Profile not found. You can create one.");
    }
  };

  const createProfile = async () => {
    try {
      const res = await API.post("/create_profile/", formData);
      setProfile(res.data);
      alert("Profile created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await API.patch("/profile/", formData);
      setProfile(res.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col items-start p-6">
      {/* Profile Info */}
      <div className="flex items-center">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              alt="avatar"
            />
          </div>
        </div>
        <div className="m-4 font-bold">
          <h1>{user?.username}</h1>
          <p>{profile?.bio}</p>
          <p>{profile?.location}</p>
        </div>

        <button
          className="btn btn-xs btn-primary"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          {profile ? "Update Profile" : "Create Profile"}
        </button>
      </div>

      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {profile ? "Update Profile" : "Create Profile"}
          </h3>

          <input
            type="text"
            placeholder="Bio"
            className="input input-bordered w-full my-2"
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location"
            className="input input-bordered w-full my-2"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <button
            className="btn btn-primary mt-2"
            onClick={profile ? updateProfile : createProfile}
          >
            {profile ? "Update" : "Create"}
          </button>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
