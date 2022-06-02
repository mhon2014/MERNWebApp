import React, { useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

import { IoMdAdd, IoIosPlay } from "react-icons/io";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

import SessionContext from "../Session/SessionContext";

import "./MovieModal.css";

function MovieModal({ movie }) {
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

  function addFavorites(id) {
    if (!session.loggedIn) {
      alert("You need to be signed in!");
    } else {
      axios
        .put("http://localhost:5000/api/user/addtofavorites", { id: id })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }
  }

  function removeFavorites(id) {
    if (!session.loggedIn) {
      alert("You need to be signed in!");
    } else {
      axios
        .put("http://localhost:5000/api/user/removefavorites", { id: id })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    }
  }

  //chnge the value false to close modal
  function handleClose() {
    session.setOpenModal(null);
  }

  // send data to the database

  return (
    <div className="boxBackground">
      <div className="container">
        <button className="close" onClick={handleClose}>
          <AiFillCloseCircle size={28} />
        </button>
        <div className="movieCover">
          <div>
            <img
              src={movie.info.image_url}
              onError={(e) => (
                (e.target.onerror = null),
                (e.target.src = "/Blockbuster_logo.svg.png")
              )}
              aria-label="image"
            ></img>
          </div>
          <div className="gradient"></div>
          <div className="movieTitle">
            <div className="title">{movie.title}</div>
            <div className="icons">
              <IoIosPlay className="icon" />
              <IoMdAdd className="icon" />
              <BsHandThumbsUp
                className="icon"
                onClick={() => addFavorites(movie._id)}
              />
              <BsHandThumbsDown
                className="icon"
                onClick={() => removeFavorites(movie._id)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="movieInfoBox">
            <div className="additionalDescription">
              <div className="left">
                <div className="topLine">
                  {movie.info.rating > 0 && (
                    <div className="rating">Rating: {movie.info.rating}</div>
                  )}
                  {movie.info.running_time_secs > 0 && (
                    <div className="duration">
                      {getHoursMinutes(movie.info.running_time_secs)}
                    </div>
                  )}
                </div>
                <div className="plot">{movie.info.plot}</div>
              </div>

              <div className="right">
                <div className="peopleInfo">
                  <div className="releaseDate">
                    <span>Release Date:</span>
                    {new Date(movie.info.release_date).toLocaleDateString(
                      "en-US"
                    )}
                  </div>

                  <div className="directors">
                    <span>Directors:</span> {movie.info.directors}
                  </div>

                  <div>
                    {" "}
                    <span>Cast:</span> {movie.info.actors.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
