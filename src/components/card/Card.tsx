import { Movie, TVShow } from '../../types';

interface CardProps {
    movie: Movie | null;
    tvShow: TVShow | null;
    setIsOverslideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActualItem: React.Dispatch<React.SetStateAction<Movie | TVShow | null>>;
}

const Card: React.FC<CardProps> = ({ movie, tvShow, setIsOverslideOpen, setActualItem }) => {
    const handleCardClick = (item: Movie | TVShow | null) => {
        setIsOverslideOpen(true);
        setActualItem(item);
    };

    return (
        <button
            type="button"
            id={movie ? movie?.id.toString() : tvShow?.id.toString()}
            key={movie ? movie?.id : tvShow?.id}
            className="mx-2 h-full origin-center contrast-75 transition-transform duration-500 ease-in-out hover:scale-105 hover:contrast-100"
            onClick={() => handleCardClick(movie ? movie : tvShow)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${movie ? movie?.poster_path : tvShow?.poster_path}`}
                alt={movie ? movie?.title : tvShow?.name}
                className="h-full w-auto"
            />
        </button>
    );
};

export default Card;
