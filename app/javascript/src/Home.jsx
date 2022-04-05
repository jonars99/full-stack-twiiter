import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { createUser, logInUser, authenticateUser } from '../packs/requests';
import './stylesheets/styles';
import image from './images/pexels-humphrey-muleba-1647121.jpg';

const Home = () => {

  //   states

  const [signUpMessage, setSignUpMessage] = useState("");
  const [logInMessage, setLogInMessage] = useState("");
  
  //   handlers

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = $('#newUsernameInput').val();
    const email = $('#newEmailInput').val();
    const password = $('#newPasswordInput').val();
    createUser(username, email, password, function (response) {
      if (response.success == false) {
        setSignUpMessage("Error! Please try again");
      }
      else {
        setSignUpMessage("Success! Please log in");
        $('#newUsernameInput').val('');
        $('#newEmailInput').val('');
        $('#newPasswordInput').val('');
      }
    });
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    const username = $('#usernameInput').val();
    const password = $('#passwordInput').val();
    logInUser(username, password, function (response) {
      if (response.success == true) {
        window.location.assign('/feed');
      }
      else {
        setLogInMessage("Error logging in. Please try again")
      }
    });
  }

  //  go to feed if user is logged in

  useEffect(() => {
    authenticateUser(function(response) {
      if (response.authenticated == true) {
        window.location.assign('/feed');
      }
    })
  }, [])

  return(
    <div id="homePage" className="container-fluid">
      <div className="row">

        <div id="homeLeft" className="col-6 d-none d-lg-flex px-0">
          <img className="img-fluid p-4 ps-0" src={image} alt="graffiti wall art image"></img>
        </div>

        <div className="col-12 col-lg-6 fw-bold p-4 home-wrapper">

          <div className="twitter-icon text-center">
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="my-3 mb-5 mb-lg-3">
            <h1 className="my-3">Happening Now</h1>
            <h3>Join Twitter today.</h3>
          </div>

          <div className="row flex-column flex-sm-row text-center">

            <div className="col-12 col-sm-6 d-flex">
              <form onSubmit={handleSignUp} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Create your account</p>
                <div>
                  <label htmlFor="newUsernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="newUsernameInput" placeholder="username" minLength="3" required></input>
                </div>
                <div>
                  <label htmlFor="newEmailInput" className="form-label" hidden>Email adress</label>
                  <input type="email" className="form-control" id="newEmailInput" placeholder="email" required></input>
                </div>
                <div>
                  <label htmlFor="newPasswordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control" id="newPasswordInput" placeholder="password" minLength="8" required></input>
                </div>
                <button type="submit" className="btn mt-3" onSubmit={handleSignUp}>Sign up</button>
                <p className="form-message my-2">
                  {signUpMessage}
                </p>
              </form>
            </div>

            <div className="col-12 col-sm-6 d-flex my-4 my-sm-0">
              <form onSubmit={handleLogIn} className="home-page-forms d-flex flex-column justify-content-around w-100 p-4">
                <p className="heading">Already have an account?</p>
                <div>
                  <label htmlFor="usernameInput" className="form-label" hidden>Username</label>
                  <input type="text" className="form-control" id="usernameInput" placeholder="username" required></input>
                </div>
                <div>
                  <label htmlFor="passwordInput" className="form-label" hidden>Password</label>
                  <input type="password" className="form-control mb-5 mb-sm-3" id="passwordInput" placeholder="password" required></input>
                </div>
                <button type="submit" className="btn mt-3" onSubmit={handleLogIn}>Log In</button>
                <p className="form-message m-0 p-0">
                  {logInMessage}
                </p>
              </form>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})