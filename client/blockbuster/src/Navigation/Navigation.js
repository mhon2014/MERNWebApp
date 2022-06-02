import {React, useContext} from "react";

import SessionContext from "../Session/SessionContext";

import {AiOutlineUser} from  "react-icons/ai";

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

  async function handleList(){
    

    const ids = await axios.get('http://localhost:5000/api/user/getlist')

    const moviesList = await axios.get('http://localhost:5000/api/movies/getmoviesid', {params: ids})
    
    session.setMyListMovies(moviesList.data)
    
    setListValue(!listValue)
  }


  return (
    <div className="navigationBar">
      <div className="logo">
        <img src={"blockbuster-logo@logotyp.us.svg"} alt="logo"></img>
      </div>

      {session.loggedIn && 
      <div className="accountBar">
        <button className="myList" onClick={handleList}>My List</button>
        <div className="profile"><AiOutlineUser/></div> 
        <a href="/" onClick={handleSignout}>Sign Out</a>
      </div>
      }
      {!session.loggedIn &&  
      <div className="accountBar">
      <a href="/signin">Sign In</a>
      </div>
      }
    </div>
  );
}

export default Navigation;
