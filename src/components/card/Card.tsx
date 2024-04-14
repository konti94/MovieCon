import { useState } from 'react';
import { Movie, TVShow } from '../../types';

const Card: React.FC<{ movie: Movie | null; tvShow: TVShow | null }> = ({ movie, tvShow }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div key={movie ? movie?.id : tvShow?.id} className="mx-2">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie ? movie?.poster_path : tvShow?.poster_path}`}
                alt={movie ? movie?.title : tvShow?.name}
            />
            {/* <h3>{movie ? movie?.title : tvShow?.name}</h3> */}
        </div>
    );
};

export default Card;
