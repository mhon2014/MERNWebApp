import axios from "axios";
import { React, useState, useEffect } from "react";

import MovieCard from "./MovieCard";

import "./MovieContainer.css";

function GenreContainer({ genre }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies/getgenremovies/", {
        params: { genre: genre, limit: 10 },
      })
      .then((response) => {
        setMovies([...response.data]);
      });
    // genres.forEach(e => {
    //     const data = getGenreMovies(e, limit);
    //     setMovies({...movies, [e]:data})
    // })
  }, [genre]);

  return (
    <div className="genreContainer">
      <div className="genreLabel">{genre}</div>
      <div className="movieSlide">
        {movies.map((movie) => (
          <MovieCard key={movie.title}movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default GenreContainer;
