import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

// Find friend component
const FindFriend = (props) => {

    const history = useHistory();

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
  }, []);

  const [usersList, setUsersList] = useState([]);
  const [text, setText] = useState('');

  // method to search users
  function searchUsers(event) {
    event.preventDefault();
    var formData = {
      "text" : text,
      "secretId" : localStorage.getItem('access_token')
    };
    userService.searchUsers(formData)
    .then(res => {
         var status = res.status;
         res.json().then(
            (result) => {
            if(status == 200) {
              var tempList = result.usersList;
              for(var i = 0; i < tempList.length; i++) {
                if(tempList[i].userImage != null) {
                  tempList[i].userImage = window.$mediaURL + tempList[i].userImage;
                }
              }
              setUsersList(tempList);
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

// method to send friend request
function sendFriendRequest(event, user) {
  event.preventDefault();
  var formData = {
    "otherUserId" : user.id,
    "secretId" : localStorage.getItem('access_token')
  };
  userService.sendFriendRequest(formData)
  .then(res => {
       var status = res.status;
       res.json().then(
          (result) => {
          if(status == 200) {
            var index = -1;
            for(var i = 0; i < usersList.length; i++) {
              if(user.id == usersList[i].id) {
                index = i;
              }
            }
            if(index != -1) {
              var temp = [...usersList]
              temp.splice(index, 1);
              setUsersList(temp);
            }
            toast.success(result.message, { hideProgressBar: true });
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

// method to get other user profile data
    function openOtherUserProfilePage(event, id) {
      event.preventDefault();
      localStorage.setItem("otherUserId", id);
      history.push('/other_user_profile');
  }
  


    return (
      <>
        <ToastContainer />
        <section class="profile_sec">
            <div class="Profile-img-head">
                <img src={profile} alt="" style={{"height" : 125}} />
            </div>
        </section>
        <section class="find-friend-sec">
          <div class="container">
                <div class="search-bar">
                  <input type="serach" value={text} onChange={(event) => {setText(event.target.value);}} class="search" placeholder="Search"></input>
                  <button class="btn-main" onClick={searchUsers}>Search</button>
                </div>
                <div class="result-row">
                  {usersList.map((user, index) =>
                    <div class="result-box">
                      <div class="friend-box">
                      <div class="friend-name-box">
                        <a href="" onClick={(event) => {openOtherUserProfilePage(event, user.id);}}></a>
                        <div class="img-side">
                          <img src={user.userImage} alt="User Image" />
                        </div>
                        <div class="name-side">
                          <h5>{user.firstName + ' ' + user.lastName}</h5>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      {/* <div class="frind-box-btn"> */}
                      {/* <a href="" onClick={(event) => {sendFriendRequest(event, user)}} class="btn-main">Send Friend Request</a> */}
                        {/* <a href="" onClick={(event) => {event.preventDefault();}} class="btn-main Delete">Delete</a> */}
                      {/* </div> */}
                    </div>
                  </div>  
                  )}
              </div>
          </div>
        </section>
      </>
    );
  };
  
export default FindFriend;