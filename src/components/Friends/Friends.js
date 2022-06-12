import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

// Friends component
const Friends = (props) => {

    const history = useHistory();
    const [loggedInUserId, setLoggedInUserId] = useState(-1);

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
      getFriends();
  }, []);

  const [usersList, setUsersList] = useState([]);
  const [text, setText] = useState('');

  // method to get friend list of logged in user
  function getFriends() {
    setLoggedInUserId(JSON.parse(localStorage.getItem("user")).id);
    var formData = {
      "secretId" : localStorage.getItem('access_token')
    };
    userService.getFriends(formData)
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
                if(tempList[i].sendTo.userImage != null) {
                  tempList[i].sendTo.userImage = window.$mediaURL + tempList[i].sendTo.userImage;
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

  // method to open other user profile
    function openOtherUserProfilePage(event, id) {
      event.preventDefault();
      for(var i = 0; i < usersList.length; i++) {
        if(usersList[i].id == id) {
          if(loggedInUserId == usersList[i].sendBy.id) {
            localStorage.setItem("otherUserId", usersList[i].sendTo.id);
          } else {
            localStorage.setItem("otherUserId", usersList[i].sendBy.id);
          }
        }
      }
      
      history.push('/other_user_profile');
  }

  // method to remove friend from friend list
  function removeFriend(event, user) {
    event.preventDefault();
    var formData = {
      "friendId" : user.id,
      "friendStatus" : 4,
      "secretId" : localStorage.getItem('access_token')
    };
    userService.removeFriend(formData)
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
                      {user.sendTo.id == loggedInUserId ?

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
                        {/* <a href="" onClick={(event) => {acceptFriendRequest(event, user)}} class="btn-main">Accept Friend Request</a> */}
                        <a href="" onClick={(event) => {removeFriend(event, user)}} class="btn-main Delete">Remove Friend</a>
                      </div>
                      </div>
                      :
                      <div class="friend-box">
                      <div class="friend-name-box">
                        <a href="" onClick={(event) => {openOtherUserProfilePage(event, user.id);}}></a>
                        <div class="img-side">
                          <img src={user.sendTo.userImage} alt="User Image" />
                        </div>
                        <div class="name-side">
                          <h5>{user.sendTo.firstName + ' ' + user.sendTo.lastName}</h5>
                          <p>{user.sendTo.email}</p>
                        </div>
                      </div>
                      <div class="frind-box-btn">
                        {/* <a href="" onClick={(event) => {acceptFriendRequest(event, user)}} class="btn-main">Accept Friend Request</a> */}
                        <a href="" onClick={(event) => {removeFriend(event, user)}} class="btn-main Delete">Remove Friend</a>
                      </div>
                      </div>
                      }
                  </div>  
                  ))}
                  {usersList.length == 0 &&
                    <div class="result-box">
                      No Friends
                    </div>
                  }
              </div>
          </div>
        </section>
      </>
    );
  };
  
export default Friends;