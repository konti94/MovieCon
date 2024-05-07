import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validation
        let hasErrors = false;
        const newErrors = {
            username: '',
            password: '',
        };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            hasErrors = true;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
        } else {
            try {
                // Call TMDB API to create request token
                const tokenResponse = await axios.get(
                    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
                );
                const tokenData = tokenResponse.data;

                if (tokenData.success === false) {
                    throw new Error(tokenData.status_message);
                }

                // Authenticate user with TMDB API using provided username and password
                const authResponse = await axios.post(
                    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
                    {
                        username: formData.username,
                        password: formData.password,
                        request_token: tokenData.request_token,
                    },
                );
                const authData = authResponse.data;

                if (authData.success === false) {
                    throw new Error(authData.status_message);
                }

                // Create session ID
                const sessionResponse = await axios.post(
                    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
                    {
                        request_token: tokenData.request_token,
                    },
                );
                const sessionData = sessionResponse.data;

                if (sessionData.success === false) {
                    throw new Error(sessionData.status_message);
                }

                // Save user session data to local storage or cookies
                localStorage.setItem('session_id', sessionData.session_id);

                // Redirect to home page
                navigate('/');
            } catch (error) {
                console.error('Error creating session:', error);
                // Handle error, show error message to user, etc.
            }
        }
    };

    return (
        <section className="mx-auto flex h-[80vh] max-w-lg items-center">
            <div className="w-full rounded-2xl border-2 border-mc-gray p-12 drop-shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full border ${
                                errors.username ? 'border-red-500' : 'border-gray-300'
                            } rounded px-3 py-2 text-black`}
                        />
                        {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded px-3 py-2 text-black`}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
