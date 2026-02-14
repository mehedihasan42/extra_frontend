import API from "./api";

export const updatePost = async (id, data) => {
  try {
    const res = await API.patch(`/content/update_post/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating post:", error.response?.data);
    throw error;
  }
};


export const deletePost = async (id) => {
  try {
    const res = await API.delete(`/content/delete_post/${id}/`);
    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error.response?.data);
    throw error;
  }
};
