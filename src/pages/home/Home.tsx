import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, TVShow } from '../../types';
import CustomCarousel from '../../components/carousel/Carousel';

const Home: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [trendingTVs, setTrendingTVs] = useState<TVShow[]>([]);
    const [onTheAirTVs, setOnTheAirTVs] = useState<TVShow[]>([]);
    const [popularTVs, setPopularTVs] = useState<TVShow[]>([]);
    const [topRatedTVs, setTopRatedTVs] = useState<TVShow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const baseUrl = 'https://api.themoviedb.org/3';

                const [
                    popularMoviesRes,
                    topRatedMoviesRes,
                    upcomingMoviesRes,
                    trendingMoviesRes,
                    trendingTVsRes,
                    onTheAirTVsRes,
                    popularTVsRes,
                    topRatedTVsRes,
                ] = await Promise.all([
                    axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/trending/movie/week?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/trending/tv/week?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/tv/on_the_air?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}`),
                    axios.get(`${baseUrl}/tv/top_rated?api_key=${apiKey}`),
                ]);

                setPopularMovies(popularMoviesRes.data.results);
                setTopRatedMovies(topRatedMoviesRes.data.results);
                setUpcomingMovies(upcomingMoviesRes.data.results);
                setTrendingMovies(trendingMoviesRes.data.results);
                setTrendingTVs(trendingTVsRes.data.results);
                setOnTheAirTVs(onTheAirTVsRes.data.results);
                setPopularTVs(popularTVsRes.data.results);
                setTopRatedTVs(topRatedTVsRes.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h2 className="mb-4 text-2xl">Popular Movies</h2>
            <div className="mb-8">{<CustomCarousel movies={popularMovies} tvShows={null} />}</div>

            <h2 className="mb-4 text-2xl">Top Rated Movies</h2>
            <div className="mb-8">{<CustomCarousel movies={topRatedMovies} tvShows={null} />}</div>

            <h2 className="mb-4 text-2xl">Upcoming Movies</h2>
            <div className="mb-8">{<CustomCarousel movies={upcomingMovies} tvShows={null} />}</div>

            <h2 className="mb-4 text-2xl">Trending Movies</h2>
            <div className="mb-8">{<CustomCarousel movies={trendingMovies} tvShows={null} />}</div>

            <h2 className="mb-4 text-2xl">Trending TV Shows</h2>
            <div className="mb-8">{<CustomCarousel movies={null} tvShows={trendingTVs} />}</div>

            <h2 className="mb-4 text-2xl">TV Shows On The Air</h2>
            <div className="mb-8">{<CustomCarousel movies={null} tvShows={onTheAirTVs} />}</div>

            <h2 className="mb-4 text-2xl">Popular TV Shows</h2>
            <div className="mb-8">{<CustomCarousel movies={null} tvShows={popularTVs} />}</div>

            <h2 className="mb-4 text-2xl">Top Rated TV Shows</h2>
            <div className="mb-8">{<CustomCarousel movies={null} tvShows={topRatedTVs} />}</div>
        </section>
    );
};

export default Home;
