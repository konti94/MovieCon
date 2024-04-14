import Carousel from 'react-multi-carousel';
import { Movie, TVShow } from '../../types';
import { responsive } from '../../constants';
import Card from '../card/Card';

const CustomCarousel: React.FC<{ movies: Movie[] | null; tvShows: TVShow[] | null }> = ({ movies, tvShows }) => {
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
            {movies && movies.map((movie) => <Card movie={movie} tvShow={null} />)}
            {tvShows && tvShows.map((show) => <Card movie={null} tvShow={show} />)}
        </Carousel>
    );
};

export default CustomCarousel;
