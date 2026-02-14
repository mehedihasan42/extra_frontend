const updateProfile = async () => {
  try {
    let profileUrl = formData.profile;

    // Check if the profile is a File (not a string)
    if (formData.profile && formData.profile instanceof File) {
      const imageData = new FormData();
      imageData.append("image", formData.profile);

      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=990065b5b45a25bb740e69adf495522a",
        { method: "POST", body: imageData }
      );

      const imgbbData = await imgbbResponse.json();
      profileUrl = imgbbData.data.url; // ✅ valid URL
    }

    // Send the URL to backend
    const res = await API.patch("/user/profile/", {
      profile: profileUrl,
      bio: formData.bio
    });

    setProfile(res.data);
    alert("Profile updated successfully!");
    document.getElementById("my_modal_2").close();
  } catch (error) {
    console.log(error.response?.data || error);
    alert("Something went wrong!");
  }
};