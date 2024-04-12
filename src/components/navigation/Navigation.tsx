import { Link } from 'react-router-dom';
import Logo from '/assets/logo.svg';

function Navigation() {
    return (
        <>
            <nav className="flex w-screen items-center justify-between px-12 py-4 font-oswald">
                <Link to="/" className="flex items-center text-mc-red">
                    <img src={Logo} alt="moviecon logo" className="mr-2 h-12 w-12" />
                    <span className="text-xl">MovieCon</span>
                </Link>
                <ul className="mt-0.5 flex gap-4">
                    <Link to="/films" className="nav-link">
                        Films
                    </Link>
                    <Link to="/tv-shows" className="nav-link">
                        TV Shows
                    </Link>
                    <Link to="/watchlist" className="nav-link">
                        Watchlist
                    </Link>
                    <Link to="/popular" className="nav-link">
                        Popular
                    </Link>
                </ul>
                <div>
                    <button
                        type="button"
                        className="mr-2 rounded border border-solid border-mc-red px-6 py-2 text-mc-red transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark hover:text-white"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="rounded border border-mc-red bg-mc-red px-6 py-2 transition duration-500 hover:border-mc-red-dark hover:bg-mc-red-dark"
                    >
                        Join
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Navigation;
