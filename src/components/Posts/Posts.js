import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

// My profile component
const Posts = (props) => {

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [mobile, setMobile] = useState('');
    const [bio, setBio] = useState('');
    const [imgData, setImgData] = useState(null);
    const [picture, setPicture] = useState(null);

    const [user, setUser] = useState({});
    const [postsList, setPostsList] = useState([]);

    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);


    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderProfile').addClass('active');
        $('#idHeaderHome').removeClass('active');
        $('#idHeaderLogin').removeClass('active');
        $('#idHeaderRegister').removeClass('active');
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
        getPostsList();
    }, []);

    // method to get posts list
    function getPostsList() {
      userService.getPostsList()
      .then(res => {
           var status = res.status;
           res.json().then(
              (result) => {
              if(status == 200) {
                var tempList = result.list;
                for(var i = 0; i < tempList.length; i++) {
                  if(tempList[i].user.userImage != null) {
                    tempList[i].user.userImage = window.$mediaURL + tempList[i].user.userImage;
                  }
                  if(tempList[i].image != null) {
                    tempList[i].image = window.$mediaURL + tempList[i].image;
                  }
                }
                setPostsList(tempList);

              } else if (status == 401) {
                 toast.error(result.error_description, {hideProgressBar: true, pauseOnHover: false});
              } else {
                 toast.error(result.message, {hideProgressBar: true, pauseOnHover: false});
              }
              }
           )
      },
      (error) => {
        toast.error(error.message, {hideProgressBar: true, pauseOnHover: false});
      }
      )
  }

    return (
      <>
        <ToastContainer />
        <section class="profile_sec">
            <div class="Profile-img-head">
                <img src={profile} alt="" style={{"height" : 125}} />
            </div>
            <div class="container margin-top">
                <div class="row">
                        <div class="second-box">
                        <div class="post-sec">
                          {postsList.map((post, index) =>
                            <div class="white-box post-box">
                              <div class="post-name">
                              <img src={post.user.userImage} alt="User Image" />
                                <h5>{post.user.firstName + ' ' + post.user.lastName}</h5>
                              </div>
                              <div class="post-content">
                              <img src={post.image} alt="Post Image" />
                                <p>{post.description}</p>
                              </div>
                            </div>
                          )}
                          
                        </div>
                          </div>
                </div>
            </div>

        </section>

        {/* <img src={profile} alt="" /> */}
      </>
    );
  };
  
export default Posts;
