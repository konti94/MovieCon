import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Movie, TVShow } from '../../types';
import axios from 'axios';

const Overslide: React.FC<{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    actualItem: Movie | TVShow | null;
    isWatchlist: boolean;
}> = ({ isOpen, setIsOpen, actualItem, isWatchlist }) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const sessionId = localStorage.getItem('session_id');
    const [accountId, setAccountId] = useState<string | null>(null);
    const isLoggedIn = localStorage.getItem('is_logged_in');

    useEffect(() => {
        const fetchAccountId = async () => {
            if (!isLoggedIn) {
                return;
            }

            if (!sessionId || !apiKey) {
                console.error('Missing session ID or API key');
                return;
            }

            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`,
                );
                setAccountId(response.data.id);
                localStorage.setItem('account_id', response.data.id);
            } catch (error) {
                console.error('Error fetching account ID:', error);
            }
        };

        fetchAccountId();
    }, [sessionId, apiKey]);

    const isMovie = (item: any): item is Movie => {
        return item?.hasOwnProperty('title') && item?.hasOwnProperty('release_date');
    };

    const handleAddToWatchlist = async () => {
        if (!actualItem || !sessionId || !accountId) {
            alert('Missing session or account information.');
            return;
        }

        try {
            const movieStatusResponse = await axios.get(
                `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${apiKey}&session_id=${sessionId}`,
            );

            const movieStatusData = movieStatusResponse.data.results;
            const isMovieInWatchlist = movieStatusData.some((item: any) => item.id === actualItem.id);

            const tvStatusResponse = await axios.get(
                `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=${apiKey}&session_id=${sessionId}`,
            );

            const tvStatusData = tvStatusResponse.data.results;
            const isTvInWatchlist = tvStatusData.some((item: any) => item.id === actualItem.id);

            if (!isMovieInWatchlist || !isTvInWatchlist) {
                await axios.post(
                    `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${apiKey}&session_id=${sessionId}`,
                    {
                        media_type: isMovie(actualItem) ? 'movie' : 'tv',
                        media_id: actualItem.id,
                        watchlist: true,
                    },
                );
            } else {
                alert('Item is already in the watchlist.');
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            console.log('Failed to add item to watchlist.');
        }

        setIsOpen(false);
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog className="relative z-50" onClose={() => setIsOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-slate-950 py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <DialogTitle className="flex items-center justify-between font-oswald text-base font-semibold leading-6 text-white">
                                                {isMovie(actualItem) ? actualItem?.title : actualItem?.name}
                                                <TransitionChild
                                                    as={Fragment}
                                                    enter="ease-in-out duration-500"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="ease-in-out duration-500"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <button
                                                        type="button"
                                                        className="relative h-6 w-6"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="absolute -inset-2.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 384 512"
                                                            fill="currentColor"
                                                            className="h-full w-full"
                                                        >
                                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                        </svg>
                                                    </button>
                                                </TransitionChild>
                                            </DialogTitle>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 text-white sm:px-6">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${actualItem?.poster_path}.jpg`}
                                                alt={isMovie(actualItem) ? actualItem?.title : actualItem?.name}
                                                className="mb-4 h-auto w-full object-contain"
                                            />
                                            <div className="flex w-full items-center justify-between">
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 576 512"
                                                        fill="currentColor"
                                                        className="h-5 w-5 text-yellow-300"
                                                    >
                                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                                    </svg>
                                                    <span className="ml-2 text-lg">
                                                        {actualItem?.vote_average} / 10
                                                    </span>
                                                </p>
                                                <p className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 640 512"
                                                        fill="currentColor"
                                                        className="h-5 w-5 text-mc-orange"
                                                    >
                                                        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                                    </svg>
                                                    <span className="ml-2 text-lg">{actualItem?.vote_count} votes</span>
                                                </p>
                                            </div>
                                            <p className="mb-4 w-full pr-2 text-center font-oswald text-xl">
                                                {isMovie(actualItem)
                                                    ? actualItem?.release_date
                                                    : actualItem?.first_air_date}
                                            </p>
                                            <p className="mb-8">{actualItem?.overview}</p>
                                            {isLoggedIn && !isWatchlist && (
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="hover:border-mc-orange-dark hover:bg-mc-orange-dark rounded border border-mc-orange bg-mc-orange px-6 py-2 transition duration-500"
                                                        onClick={handleAddToWatchlist}
                                                    >
                                                        Add to watchlist
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Overslide;
