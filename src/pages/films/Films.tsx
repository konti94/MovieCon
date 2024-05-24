import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, TVShow } from '../../types';
import Overslide from '../../components/overslide/Overslide';
import List from '../../components/list/List';
import Pagination from '../../components/pagination/Pagination';

const Films: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOverslideOpen, setIsOverslideOpen] = useState(false);
    const [actualItem, setActualItem] = useState<Movie | TVShow | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = 500;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_TMDB_API_KEY;
                const baseUrl = 'https://api.themoviedb.org/3';
                const response = await axios.get(
                    `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`,
                );
                setMovies(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section>
                <h2 className="mb-6 text-2xl">Movies</h2>
                {movies.length > 0 ? (
                    <List
                        type="movie"
                        items={movies}
                        setActualItem={setActualItem}
                        setIsOverslideOpen={setIsOverslideOpen}
                    />
                ) : (
                    <p>No movies found</p>
                )}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
            <Overslide
                isOpen={isOverslideOpen}
                setIsOpen={setIsOverslideOpen}
                actualItem={actualItem}
                isWatchlist={false}
            />
        </>
    );
};

export default Films;
