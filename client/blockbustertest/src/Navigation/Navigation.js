import {React, useContext} from "react";

import SessionContext from "../Session/SessionContext";

import {AiOutlineUser } from  "react-icons/ai";

import {MdSearch, MdNotifications, MdArrowDropDown} from "react-icons/md";

import axios from 'axios';

import "./Navigation.css";

function Navigation({listValue, setListValue, setListMovies}) {
  const session = useContext(SessionContext);
  
  function handleSignout(){
    console.log('Signed Out!')
    axios.get('http://localhost:5000/api/user/signout')
    .then(response => {
      if (response.status === 200) {
          console.log('Yippieeeee')
          // navigate('/');
      }
  })
    //send request to delete session
  }

  async function handleFav(){
    

    const ids = await axios.get('http://localhost:5000/api/user/getfavorites')

    const favmovies = await axios.get('http://localhost:5000/api/movies/getmoviesid', {params: ids})
    
    session.setMyListMovies(favmovies.data)
    
    setListValue(!listValue)
  }


  return (
    <div className="navigationBar">
      <div className="container">
        <div className="linksSection">
          <img src={"https://upload.wikimedia.org/wikipedia/commons/4/46/Blockbuster_logo.svg"} alt="logo"></img>
          <span>Home</span>
          <span>My List</span>
        </div>
        {/* {!session.loggedIn && 
        <div className="accountSection">
        <a href="/signin">Sign In</a>
        </div>
        } */}

        {!session.loggedIn && 
        <div className="accountSection">
        <MdSearch/>
        <MdNotifications/>
        <MdArrowDropDown/>

        <div className="profile"><AiOutlineUser/></div> 
        <a href="/" onClick={handleSignout}>Sign Out</a>
        <a href="/signin">Sign In</a>
        </div>
        }
      </div>
    </div>
  );
}

export default Navigation;
