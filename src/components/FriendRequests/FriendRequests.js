import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

// Friend request component
const FriendRequests = (props) => {

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
      getFriendRequests();
  }, []);

  const [usersList, setUsersList] = useState([]);
  const [text, setText] = useState('');

  // method to get friend requests of logged in user
  function getFriendRequests() {
    var formData = {
      "secretId" : localStorage.getItem('access_token')
    };
    userService.getFriendRequests(formData)
    .then(res => {
         var status = res.status;
         res.json().then(
            (result) => {
            if(status == 200) {
              var tempList = result.friends;
              for(var i = 0; i < tempList.length; i++) {
                if(tempList[i].sendBy.userImage != null) {
                  tempList[i].sendBy.userImage = window.$mediaURL + tempList[i].sendBy.userImage;
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

// method to open other user profile page
    function openOtherUserProfilePage(event, id) {
      event.preventDefault();
      localStorage.setItem("otherUserId", id);
      history.push('/other_user_profile');
  }

  // method to accept friend request
  function acceptFriendRequest(event, user) {
    event.preventDefault();
    var formData = {
      "friendId" : user.id,
      "friendStatus" : 2,
      "secretId" : localStorage.getItem('access_token')
    };
    userService.acceptOrRejectFriendRequest(formData)
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

  // method to reject friend request
  function rejectFriendRequest(event, user) {
    event.preventDefault();
    var formData = {
      "friendId" : user.id,
      "friendStatus" : 3,
      "secretId" : localStorage.getItem('access_token')
    };
    userService.acceptOrRejectFriendRequest(formData)
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
                <div class="result-row">
                  {usersList.length > 0 &&
                  (usersList.map((user, index) =>
                    <div class="result-box">
                      <div class="friend-box">
                      <div class="friend-name-box">
                        <a href="" onClick={(event) => {openOtherUserProfilePage(event, user.id);}}></a>
                        <div class="img-side">
                          <img src={user.sendBy.userImage} alt="User Image" />
                        </div>
                        <div class="name-side">
                          <h5>{user.sendBy.firstName + ' ' + user.sendBy.lastName}</h5>
                          <p>{user.sendBy.email}</p>
                        </div>
                      </div>
                      <div class="frind-box-btn">
                        <a href="" onClick={(event) => {acceptFriendRequest(event, user)}} class="btn-main">Accept Friend Request</a>
                        <a href="" onClick={(event) => {rejectFriendRequest(event, user)}} class="btn-main Delete">Reject Friend Request</a>
                      </div>
                    </div>
                  </div>  
                  ))}
                  {usersList.length == 0 &&
                    <div class="result-box">
                      <div class="friend-name-box">
                        No Friend Requests
                      </div>
                    </div>
                  }
              </div>
          </div>
        </section>
      </>
    );
  };
  
export default FriendRequests;