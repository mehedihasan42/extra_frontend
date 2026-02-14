import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserProfile } from "../api/FollowApi";

const PublicProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            const data = await getUserProfile(id);
            setProfile(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!profile) {
        return <p className="text-center mt-10">Profile not found</p>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4">

            <div className="card bg-base-100 shadow-xl border">
                <div className="card-body items-center text-center">

                    {/* Profile Picture */}
                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                                src={
                                    profile.profile_picture ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <h2 className="card-title text-2xl mt-4">
                        {profile.user?.first_name} {profile.user?.last_name}
                    </h2>

                    {/* Username */}
                    <p className="text-gray-500">
                        @{profile.user?.username}
                    </p>

                    {/* Bio */}
                    <p className="mt-4">
                        {profile.bio || "No bio available"}
                    </p>

                    {/* Extra Info */}
                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                        <p>📧 {profile.user?.email}</p>
                        <p>📱 {profile.user?.phone}</p>
                        <p>🏠 {profile.user?.present_address}</p>
                        <p>🏡 {profile.user?.hometown}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PublicProfile;
