import { React, useState, useEffect } from "react";

import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";

import axios from "axios";

import Navigation from "../Navigation/Navigation";
import MovieContainer from "../MovieContainer/MovieContainer";
import SessionContext from "../Session/SessionContext";
import MovieModal from "../MovieContainer/MovieModal";

import "./App.css";
import MyListOverlay from "../MovieContainer/MyListOverlay";

function App() {
  const [loggedIn, setLoggedIn] = useState("");

  const [myListMovies, setMyListMovies] = useState([]);

  const [openModal, setOpenModal] = useState(null);

  const session = {
    loggedIn,
    setLoggedIn,
    myListMovies,
    setMyListMovies,
    openModal,
    setOpenModal,
  };

  const [myList, setMyList] = useState(false);

  const [genresData, setGenres] = useState([]);

  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/movies/getmovies")
  //     .then((response) => setMovieData(response.data));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies/getgenres")
      .then((response) => setGenres(response.data));
  }, []);

  useEffect(() => {
    
    axios.get("http://localhost:5000/api/user/signin").then((response) => {
      console.log(response.data);
      if (response.data.loggedIn === true) {
        setLoggedIn(response.data.user.firstName);
      }
    });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {/* // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"> */}
      <div className="mainContainer" style={{position: openModal ? 'fixed': 'relative'}}>
        {openModal && <MovieModal movie={openModal}></MovieModal>}
        <Navigation listValue={myList} setListValue={setMyList}></Navigation>
        {myList && <MyListOverlay></MyListOverlay>}
        <MovieContainer genres={genresData}></MovieContainer>
        <CookieConsent
          location="bottom"
          buttonText="Sure man!!!"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.{" "}
          <span style={{ fontSize: "10px" }}></span>
        </CookieConsent>
      </div>
    </SessionContext.Provider>
  );
}

export default App;
