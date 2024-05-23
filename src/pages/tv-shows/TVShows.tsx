import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, TVShow } from '../../types';
import Overslide from '../../components/overslide/Overslide';
import List from '../../components/list/List';

const TVShows: React.FC = () => {
    const [shows, setShows] = useState<TVShow[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOverslideOpen, setIsOverslideOpen] = useState(false);
    const [actualItem, setActualItem] = useState<Movie | TVShow | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const baseUrl = 'https://api.themoviedb.org/3';
                const response = await axios.get(
                    `${baseUrl}/tv/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
                );
                setShows(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <h2 className="mb-6 text-2xl">TV Shows</h2>
                {shows.length > 0 ? (
                    <List
                        type="show"
                        items={shows}
                        setActualItem={setActualItem}
                        setIsOverslideOpen={setIsOverslideOpen}
                    />
                ) : (
                    <p>No TV series found</p>
                )}
            </section>
            <Overslide isOpen={isOverslideOpen} setIsOpen={setIsOverslideOpen} actualItem={actualItem} />
        </>
    );
};

export default TVShows;
