import API from "./api";

// Save a post
export const savePost = (postId) => {
  return API.post("/content/save/", { post_id: postId });
};

// Get all saved posts
export const getSavedPosts = () => {
  return API.get("/content/save/");
};

// Unsave a post
export const unsavePost = (postId) => {
  return API.delete(`/content/unsave/${postId}/`);
};
