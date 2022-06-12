import logo from "../../../assets/images/logo.png"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import $ from 'jquery'; 

// Common header page
const Header = (props) => {

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderHome').addClass('active');
        $('#idHeaderLogin').removeClass('active');
        $('#idHeaderRegister').removeClass('active');
        $('#idHeaderProfile').removeClass('active');
        if(localStorage.getItem("isLoggedIn") != null && localStorage.getItem("isLoggedIn") == "true") {
            $('.classAfterLogin').show();
            $('.classBeforeLogin').hide();
            $('#idLoggedInUserName').html(JSON.parse(localStorage.getItem('user')).firstName + ' ' + JSON.parse(localStorage.getItem('user')).lastName);
            if(JSON.parse(localStorage.getItem('user')).userImage != null) {
                $("#idLoggedInUserImage").attr("src", window.$mediaURL + JSON.parse(localStorage.getItem('user')).userImage);
            }
        } else {
            $('.classBeforeLogin').show();
            $('.classAfterLogin').hide();
        }
    }, []);
    
    const history = useHistory();
    
    // method to open home page
    function openHomePage(event) {
        event.preventDefault();
        history.push('/home');
    }

    // method to open register page
    function openRegisterPage(event) {
        event.preventDefault();
        history.push('/register');
    }

    // method to open login page
    function openLoginPage(event) {
        event.preventDefault();
        history.push('/login');
    }

    // method to open logged in user's profile page
    function openMyProfilePage(event) {
        event.preventDefault();
        history.push('/my_profile');
    }

    // method to open friend requests page
    function openFriendRequestsPage(event) {
        event.preventDefault();
        history.push('/friend_requests');
    }

    // method to open friend page
    function openFriendsPage(event) {
        event.preventDefault();
        history.push('/friends');
    }

    function openResumes(event) {
        event.preventDefault();
        history.push('/resumes');
    }

    function openPosts(event) {
        event.preventDefault();
        history.push('/posts');
    }

    // method to handle logout functionality
    function logout(event) {
        event.preventDefault();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem('isLoggedIn');
        history.push('/home');
        window.location.reload(false);
    }

    return (
      <>
        <ToastContainer />
        <header>
            <nav class="navbar navbar-expand-md">
                <div class="container">
                    <a class="navbar-brand" href="" onClick={(event) => {event.preventDefault();}}>
                        <img src={logo} alt="" />   
                    </a>
                        <ul class="navbar-nav" style={{display: "inline-flex"}}>
                            <li class="nav-item" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openHomePage(event)}}>Home</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openMyProfilePage(event)}}>My Profile</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openFriendRequestsPage(event)}}>Friend Requests</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openFriendsPage(event)}}>Friends</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openResumes(event)}}>Resumes</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openPosts(event)}}>Posts</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {logout(event)}}>Logout</a>
                            </li>
                            <li class="nav-item classBeforeLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openRegisterPage(event)}}>Register</a>
                            </li>
                            <li class="nav-item classBeforeLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openLoginPage(event)}}>Login</a>
                            </li>
                        </ul>
                </div>
            </nav>
        </header>
    </>
    );
  };
  
  export default Header;