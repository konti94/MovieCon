import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, TVShow } from '../../types';
import CustomCarousel from '../../components/carousel/Carousel';
import Overslide from '../../components/overslide/Overslide';
import { apiKey, baseUrl } from '../../constants';

const Watchlist: React.FC = () => {
    const [movieWatchlist, setMovieWatchlist] = useState<Movie[]>([]);
    const [tvWatchlist, setTvWatchlist] = useState<TVShow[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOverslideOpen, setIsOverslideOpen] = useState(false);
    const [actualItem, setActualItem] = useState<Movie | TVShow | null>(null);

    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${baseUrl}/account/${accountId}/watchlist/movies`, {
                    params: {
                        api_key: apiKey,
                        session_id: sessionId,
                    },
                });
                if (response.status === 200 && response.data.results) {
                    setMovieWatchlist(response.data.results);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie watchlist:', error);
                setLoading(false);
            }
        };

        const fetchTvs = async () => {
            try {
                const response = await axios.get(`${baseUrl}/account/${accountId}/watchlist/tv`, {
                    params: {
                        api_key: apiKey,
                        session_id: sessionId,
                    },
                });
                if (response.status === 200 && response.data.results) {
                    setTvWatchlist(response.data.results);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching TV watchlist:', error);
                setLoading(false);
            }
        };

        if (accountId && sessionId) {
            fetchMovies();
            fetchTvs();
        } else {
            setLoading(false);
            console.error('Missing account ID or session ID.');
        }
    }, [accountId, apiKey, sessionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <h2 className="mb-6 text-2xl">Movies watchlist</h2>
                {movieWatchlist?.length > 0 ? (
                    <div className="mb-8">
                        {
                            <CustomCarousel
                                movies={movieWatchlist}
                                tvShows={null}
                                setIsOverslideOpen={setIsOverslideOpen}
                                setActualItem={setActualItem}
                            />
                        }
                    </div>
                ) : (
                    <p className="mb-8">No movies added to watchlist yet.</p>
                )}
                <h2 className="mb-6 text-2xl">TV shows watchlist</h2>
                {tvWatchlist?.length > 0 ? (
                    <div className="mb-8">
                        {
                            <CustomCarousel
                                movies={null}
                                tvShows={tvWatchlist}
                                setIsOverslideOpen={setIsOverslideOpen}
                                setActualItem={setActualItem}
                            />
                        }
                    </div>
                ) : (
                    <p className="mb-8">No tv shows added to watchlist yet.</p>
                )}
            </section>
            <Overslide
                isOpen={isOverslideOpen}
                setIsOpen={setIsOverslideOpen}
                actualItem={actualItem}
                isWatchlist={true}
            />
        </>
    );
};

export default Watchlist;
