import React, { useEffect, useState } from "react";
import API from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    const res = await API.get(`/user/searchUser/?search=${search}`);
    setUsers(res.data);
  };

  const followUser = async (id) => {
    await API.post(`/user/follow/${id}/`);
    fetchUsers();
  };

  const unfollowUser = async (id) => {
    await API.post(`/user/unfollow/${id}/`);
    fetchUsers();
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.map((user) => (
        <div
          key={user.id}
          className="card bg-base-100 shadow mb-3"
        >
          <div className="card-body flex-row justify-between items-center">
            <div>
              <h2 className="font-bold">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>

            {user.is_following ? (
              <button
                className="btn btn-outline btn-error"
                onClick={() => unfollowUser(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => followUser(user.id)}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
