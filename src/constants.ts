export const responsive = {
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

export const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export const baseUrl = 'https://api.themoviedb.org/3';
