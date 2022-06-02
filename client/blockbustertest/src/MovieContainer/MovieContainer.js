import {React} from "react";

import GenreContainer from "./GenreContainer"

import "./MovieContainer.css";

function MovieContainer({genres }) {


  return (
    <div className="movieContainer">
      {/* <div className='genreContainer'>
            <div className='genreLabel'>{genres[0]}</div>
            <div className='movieSlide'>{movies
                .filter(movie => movie.info.genres.includes(genres[0]))
                .map(filtered => <MovieCard movie={filtered}/>)}
            </div>
            </div>
             */}

      {genres.map((e, id) => (
        <GenreContainer key={id} genre={e}></GenreContainer>
      ))}

      {/* {genres.map(e => <div className='genreContainer'>
                             <div className='genreLabel'>{e}</div>
                             <div className='movieSlide'>{movies
                                    .filter(movie => movie.info.genres.includes(e))
                                    .map(filtered => <MovieCard movie={filtered}/>)}
                             </div>
                             </div>)} */}

      {/* {movies.map((e,id) => (<MovieCard key={id} movie={e}> </MovieCard> ))} */}
    </div>
  );
}

export default MovieContainer;
