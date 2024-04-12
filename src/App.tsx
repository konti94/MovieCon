import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Films from './pages/films/Films';
import Home from './pages/home/Home';
import Popular from './pages/popular/Popular';
import TVShows from './pages/tv-shows/TVShows';
import Watchlist from './pages/watchlist/Watchlist';

function App() {
    return (
        <>
            <Router>
                <div>
                    <Navigation />
                    <div className="w-screen px-12 py-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/films" element={<Films />} />
                            <Route path="/tv-shows" element={<TVShows />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route path="/popular" element={<Popular />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;
