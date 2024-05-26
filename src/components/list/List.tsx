import React from 'react';
import { Movie, TVShow } from '../../types';
import Card from '../card/Card';

interface ListProps {
    type: string;
    items: Movie[] | TVShow[];
    setIsOverslideOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setActualItem: React.Dispatch<React.SetStateAction<Movie | TVShow | null>>;
}

const List: React.FC<ListProps> = ({ type, items, setIsOverslideOpen, setActualItem }) => {
    return (
        <div className="list mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {type === 'movie'
                ? items.map((item) => (
                      <Card
                          key={item?.id}
                          movie={item as Movie}
                          tvShow={null}
                          setIsOverslideOpen={setIsOverslideOpen}
                          setActualItem={setActualItem}
                      />
                  ))
                : items.map((item) => (
                      <Card
                          key={item?.id}
                          movie={null}
                          tvShow={item as TVShow}
                          setIsOverslideOpen={setIsOverslideOpen}
                          setActualItem={setActualItem}
                      />
                  ))}
        </div>
    );
};

export default List;
