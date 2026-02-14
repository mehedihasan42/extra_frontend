import React, { useEffect, useState } from "react";
import { getFollowers } from "../api/FollowApi";
import { Link } from "react-router";

const Followers = () => {

    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFollowers = async () => {
        try {
            const data = await getFollowers();
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

                            <button className="btn btn-sm btn-primary">
                                <Link></Link>
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default Followers;
