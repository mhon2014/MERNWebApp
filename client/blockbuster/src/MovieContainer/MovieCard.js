import { React, useContext } from "react";

import SessionContext from "../Session/SessionContext";

import { IoMdAdd, IoIosPlay } from "react-icons/io";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

import axios from "axios";

import "./MovieCard.css";

function MovieCard({ movie }) {
  const session = useContext(SessionContext);

  // console.log(movie)
  function getHoursMinutes(seconds) {
    return (
      Math.floor(seconds / 3600) +
      "h " +
      Math.floor((seconds % 3600) / 60) +
      "m"
    );
  }

  function addList(id) {
    if (!session.loggedIn) {
      alert("You need to be signed in!");
    } else {
      axios
        .put("http://localhost:5000/api/user/addtolist", { id: id })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }
  }

  function removeList(id) {
    if (!session.loggedIn) {
      alert("You need to be signed in!");
    } else {
      axios
        .put("http://localhost:5000/api/user/removelist", { id: id })
        .then((response) => 
          axios
          .get("http://localhost:5000/api/movies/getmoviesid", {params: response})
        )
        .then((movies) => session.setMyListMovies(movies.data))
        // .catch((error) => console.log(error));
    }
  }

  function handleModal(movie) {
    session.setOpenModal(movie);
    // console.log(session.openModal)
  }

  return (
    <article className="movieCard">
      <img
        src={movie.info.image_url}
        onError={(e) => (
          (e.target.onerror = null),
          (e.target.src = "/Blockbuster_logo.svg.png")
        )}
        aria-label="image"
        onClick={() => handleModal(movie)}
      ></img>
      <div>
        <div className="movieInfoBox">
          <div className="movieTitle">{movie.title}</div>
          <div className="icons">
            <IoIosPlay className="icon" />
            <IoMdAdd className="icon" />
            <BsHandThumbsUp
              className="icon"
              onClick={() => addList(movie._id)}
            />
            <BsHandThumbsDown
              className="icon"
              onClick={() => removeList(movie._id)}
            />
          </div>
          <div className="additionalDescription">
            {movie.info.rating > 0 && (
              <span className="rating">Rating: {movie.info.rating}</span>
            )}
            {movie.info.running_time_secs > 0 && (
              <span className="duration">
                {getHoursMinutes(movie.info.running_time_secs)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
