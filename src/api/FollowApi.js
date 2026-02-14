import API from "./api";

export const getFollowers = async () => {
  try {
    const response = await API.get("/user/followers/"); 
    // change URL if different in your backend
    return response.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

export const getFollowing = async () => {
  try {
    const response = await API.get("/user/following/"); 
    // change URL if different in your backend
    return response.data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
};

export const getUserProfile = async (id) => {
  try {
    const res = await API.get(`/user/public_profile/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};