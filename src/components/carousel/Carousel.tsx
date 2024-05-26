import Carousel from 'react-multi-carousel';
import { Movie, TVShow } from '../../types';
import { responsive } from '../../constants';
import Card from '../card/Card';

const CustomCarousel: React.FC<{
    movies: Movie[] | null;
    tvShows: TVShow[] | null;
    setIsOverslideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActualItem: React.Dispatch<React.SetStateAction<Movie | TVShow | null>>;
}> = ({ movies, tvShows, setIsOverslideOpen, setActualItem }) => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="py-2"
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
            {movies &&
                movies.map((movie) => (
                    <Card
                        key={movie?.id}
                        movie={movie}
                        tvShow={null}
                        setIsOverslideOpen={setIsOverslideOpen}
                        setActualItem={setActualItem}
                    />
                ))}
            {tvShows &&
                tvShows.map((show) => (
                    <Card
                        key={show?.id}
                        movie={null}
                        tvShow={show}
                        setIsOverslideOpen={setIsOverslideOpen}
                        setActualItem={setActualItem}
                    />
                ))}
        </Carousel>
    );
};

export default CustomCarousel;
