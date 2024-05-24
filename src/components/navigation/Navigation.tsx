import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/assets/logo.svg';
import axios from 'axios';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropwdownOpen] = useState(false);
    const [userDetails, setUserDetails] = useState<any>(null);

    const navigate = useNavigate();

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    const toggleUserDropdown = () => {
        setIsDropwdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const sessionId = localStorage.getItem('session_id');

                if (sessionId) {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
                    );
                    setUserDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [apiKey]);

    const handleLogout = async () => {
        try {
            const sessionId = localStorage.getItem('session_id');
            if (sessionId) {
                // Delete session using Axios
                await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`, {
                    data: {
                        session_id: sessionId,
                    },
                });
                // Remove session ID from local storage
                localStorage.removeItem('session_id');
                localStorage.removeItem('account_id');
                // Redirect to home page or login page
                navigate('/login');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            <nav className="sticky left-0 top-0 z-20 flex w-screen items-center justify-between bg-black/50 px-12 py-4 font-oswald">
                <Link to="/" className="flex items-center text-mc-red">
                    <img src={Logo} alt="moviecon logo" className="mr-2 h-12 w-12" />
                    <span className="text-xl">MovieCon</span>
                </Link>

                <div className="block lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"
                            />
                        </svg>
                    </button>
                </div>

                <ul className="hidden lg:mt-0.5 lg:flex lg:gap-4">
                    <li>
                        <Link to="/films" className="nav-link">
                            Films
                        </Link>
                    </li>
                    <li>
                        <Link to="/tv-shows" className="nav-link">
                            TV Shows
                        </Link>
                    </li>
                    {userDetails && (
                        <li>
                            <Link to="/watchlist" className="nav-link">
                                Watchlist
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="hidden lg:block">
                    {userDetails ? (
                        // Display logged-in username
                        <div className="relative">
                            <button
                                onClick={toggleUserDropdown}
                                className="flex items-center text-white focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    height={'1rem'}
                                    width={'1rem'}
                                    fill="white"
                                >
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                </svg>
                                <span className="ml-1">{userDetails.username}</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-black shadow-lg">
                                    <Link
                                        to="/profile"
                                        className="block rounded-t-lg px-4 py-2 text-mc-red hover:bg-mc-red-dark hover:text-white"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        type="button"
                                        className="block w-full rounded-b-lg px-4 py-2 text-left text-mc-red hover:bg-mc-red-dark hover:text-white"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Display Login button if user is not logged in
                        <Link
                            to="/login"
                            className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* Hamburger menu overlay */}
            {isOpen && (
                <div className="hamburger-menu fixed left-0 top-0 z-50 h-screen w-screen" onClick={toggleMenu}>
                    <div className="flex w-screen items-center justify-between px-12 py-4 font-oswald">
                        <div className="flex items-center text-mc-red">
                            <img src={Logo} alt="moviecon logo" className="mr-2 h-12 w-12" />
                            <span className="text-xl">MovieCon</span>
                        </div>
                        <button className="text-white focus:outline-none">
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19 5.414L18.586 5 12 11.586 5.414 5 5 5.414 11.586 12 5 18.586 5.414 19 12 12.414 18.586 19 19 18.586 12.414 12 19 5.414z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex h-full flex-col items-center">
                        <ul className="mt-[14rem] flex flex-col items-center gap-6">
                            <li>
                                <Link to="/films" className="nav-link text-white" onClick={toggleMenu}>
                                    Films
                                </Link>
                            </li>
                            <li>
                                <Link to="/tv-shows" className="nav-link text-white" onClick={toggleMenu}>
                                    TV Shows
                                </Link>
                            </li>
                            <li>
                                <Link to="/watchlist" className="nav-link text-white" onClick={toggleMenu}>
                                    Watchlist
                                </Link>
                            </li>
                        </ul>
                        <div className="absolute bottom-12 mt-8 flex">
                            {userDetails ? (
                                <div className="flex items-center justify-between">
                                    <Link
                                        to="/profile"
                                        className="px-6 py-2 text-mc-red transition duration-500 hover:underline"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        type="button"
                                        className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                // Display Login button if user is not logged in
                                <Link
                                    to="/login"
                                    className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;
