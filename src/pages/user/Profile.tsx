import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const sessionId = localStorage.getItem('session_id');
    const baseUrl = 'https://api.themoviedb.org/3';

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/account`, {
                    params: {
                        api_key: apiKey,
                        session_id: sessionId,
                    },
                });
                setUserDetails(response.data);
            } catch (err) {
                console.error('Error fetching user details:', err);
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            fetchUserDetails();
        } else {
            setLoading(false);
            console.log('Session ID is missing');
        }
    }, [apiKey, sessionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h2 className="mb-6 text-2xl">Profile</h2>
            <div>
                {userDetails ? (
                    <>
                        <div className="flex w-60 items-center justify-between">
                            <span>Username:</span>
                            <span>{userDetails.username}</span>
                        </div>
                        <div className="flex w-60 items-center justify-between">
                            <span>Nationality:</span>
                            <span>{userDetails.iso_3166_1}</span>
                        </div>
                    </>
                ) : (
                    <p>No user details available.</p>
                )}
            </div>
        </section>
    );
};

export default Profile;
