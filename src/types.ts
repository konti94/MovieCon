export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
};

export type TVShow = {
    id: number;
    name: string;
    poster_path: string;
    adult: boolean;
    overview: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
};
