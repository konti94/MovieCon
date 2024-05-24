import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Films from './pages/films/Films';
import Home from './pages/home/Home';
import TVShows from './pages/tv-shows/TVShows';
import Watchlist from './pages/watchlist/Watchlist';
import Login from './pages/auth/Login';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <div className="relative flex h-screen w-screen flex-col overflow-x-hidden">
                    <Navigation />
                    <div className="w-full flex-1 px-12 py-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/films" element={<Films />} />
                            <Route path="/tv-shows" element={<TVShows />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </>
    );
};

export default App;
