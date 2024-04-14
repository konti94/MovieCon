import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/assets/logo.svg';

const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    return (
        <>
            <nav className="flex w-screen items-center justify-between px-12 py-4 font-oswald">
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
                    <li>
                        <Link to="/watchlist" className="nav-link">
                            Watchlist
                        </Link>
                    </li>
                    <li>
                        <Link to="/popular" className="nav-link">
                            Popular
                        </Link>
                    </li>
                </ul>

                <div className="hidden lg:block">
                    <button className="mr-2 rounded border border-solid border-mc-red px-6 py-2 text-mc-red transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark hover:text-white">
                        Login
                    </button>
                    <button className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark">
                        Join
                    </button>
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
                            <li>
                                <Link to="/popular" className="nav-link text-white" onClick={toggleMenu}>
                                    Popular
                                </Link>
                            </li>
                        </ul>
                        <div className="absolute bottom-12 mt-8 flex">
                            <button className="mr-2 rounded border border-solid border-mc-red px-6 py-2 text-mc-red transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark hover:text-white">
                                Login
                            </button>
                            <button className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;
