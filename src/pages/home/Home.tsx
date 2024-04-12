import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

interface TVShow {
    id: number;
    name: string;
    poster_path: string;
}

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

    const renderMovieCarousel = (movies: Movie[]) => {
        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 3000, min: 1920 },
                items: 6,
                slidesToSlide: 6,
            },
            desktop: {
                breakpoint: { max: 1920, min: 1024 },
                items: 4,
                slidesToSlide: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
            },
        };

        return (
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="mx-2">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </Carousel>
        );
    };

    const renderTVShowCarousel = (tvShows: TVShow[]) => {
        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 3000, min: 1920 },
                items: 6,
                slidesToSlide: 6,
            },
            desktop: {
                breakpoint: { max: 1920, min: 1024 },
                items: 4,
                slidesToSlide: 4,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
            },
        };

        return (
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {tvShows.map((show) => (
                    <div key={show.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                        <h3>{show.name}</h3>
                    </div>
                ))}
            </Carousel>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <h2 className="mb-4 text-2xl">Popular Movies</h2>
            <div className="mb-8">{renderMovieCarousel(popularMovies)}</div>

            <h2 className="mb-4 text-2xl">Top Rated Movies</h2>
            <div className="mb-8">{renderMovieCarousel(topRatedMovies)}</div>

            <h2 className="mb-4 text-2xl">Upcoming Movies</h2>
            <div className="mb-8">{renderMovieCarousel(upcomingMovies)}</div>

            <h2 className="mb-4 text-2xl">Trending Movies</h2>
            <div className="mb-8">{renderMovieCarousel(trendingMovies)}</div>

            <h2 className="mb-4 text-2xl">Trending TV Shows</h2>
            <div className="mb-8">{renderTVShowCarousel(trendingTVs)}</div>

            <h2 className="mb-4 text-2xl">TV Shows On The Air</h2>
            <div className="mb-8">{renderTVShowCarousel(onTheAirTVs)}</div>

            <h2 className="mb-4 text-2xl">Popular TV Shows</h2>
            <div className="mb-8">{renderTVShowCarousel(popularTVs)}</div>

            <h2 className="mb-4 text-2xl">Top Rated TV Shows</h2>
            <div className="mb-8">{renderTVShowCarousel(topRatedTVs)}</div>
        </section>
    );
};

export default Home;
