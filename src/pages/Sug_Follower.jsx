import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Sug_Follower = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestions = async () => {
    try {
      const res = await API.get('/user/suggest-follow/');
      setSuggestions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const followUser = async (id) => {
    try {
      await API.post(`/user/follow/${id}/`);
      fetchSuggestions(); // refresh suggestions
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowUser = async (id) => {
    try {
      await API.post(`/user/unfollow/${id}/`);
      fetchSuggestions(); // refresh suggestions
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div>
        {suggestions.map(user => (
          <div className="p-2 bg-base-100 rounded shadow flex justify-between items-center" key={user.id}>
            <p>{user.username}</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => followUser(user.id)}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sug_Follower;
