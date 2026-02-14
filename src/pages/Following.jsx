import React, { useEffect, useState } from 'react';
import { getFollowing } from '../api/FollowApi';
import { Link } from 'react-router';
import API from '../api/api';

const Following = () => {

    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFollowers = async () => {
        try {
            const data = await getFollowing();
            setFollowers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFollowers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }



    // const followUser = async (id) => {
    //     try {
    //         await API.post(`/user/follow/${id}/`);

    //         setFollowers(prev =>
    //             prev.map(user =>
    //                 user.id === id
    //                     ? { ...user, is_following: true }
    //                     : user
    //             )
    //         );

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const unfollowUser = async (id) => {
    //     console.log("Unfollowing user with ID:", id);
    //     try {
    //         await API.post(`/user/unfollow/${id}/`);

    //         setFollowers(prev =>
    //             prev.map(user =>
    //                 user.id === id
    //                     ? { ...user, is_following: false }
    //                     : user
    //             )
    //         );

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const followUser = async (id) => {
    //     await API.post(`/user/follow/${id}/`);
    //     fetchFollowers();
    // };

    const unfollowUser = async (id) => {
        await API.post(`/user/unfollow/${id}/`);
        fetchFollowers();
    };


    return (
        <div className="max-w-xl mx-auto mt-6">
            {followers.length === 0 ? (
                <p className="text-gray-500">No followers yet</p>
            ) : (
                <div className="space-y-3">

                    {followers.map((user) => (
                        <div
                            key={user.id}
                            className="card bg-base-100 shadow-md p-4 flex flex-row justify-between items-center"
                        >

                            <div>
                                <Link to={`/public-profile/${user.id}`}>
                                    <h3 className="font-semibold">
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        @{user.username}
                                    </p>
                                </Link>
                            </div>
                            <button
                                className="btn btn-outline btn-primary"
                                onClick={() => unfollowUser(user.id)}
                            >
                                Unfollow
                            </button>
                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default Following;