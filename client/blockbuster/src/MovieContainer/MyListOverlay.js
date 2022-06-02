import { React, useContext} from "react";

import MovieCard from "./MovieCard";

import SessionContext from "../Session/SessionContext"


import "./MyListOverlay.css";
import "./MovieContainer.css";

function MyListOverlay() {
  const session = useContext(SessionContext);
  
  return (
    <div className="myListContainer">
      <div className="genreContainer">
        <div className="genreLabel">My List</div>
        <div className="movieSlide">
          {session.myListMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyListOverlay;
