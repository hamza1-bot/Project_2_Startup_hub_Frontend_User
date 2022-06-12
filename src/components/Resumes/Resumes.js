import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import profile from "../../assets/images/profile.jpg"
import $ from 'jquery'; 

// Find friend component
const Resumes = (props) => {

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
      getResumesList();
  }, []);

  const [resumesList, setResumesList] = useState([]);
  const [text, setText] = useState('');

  // method to search users
  function getResumesList() {
    var formData = {
      "secretId" : localStorage.getItem('access_token')
    };
    userService.getResumesList(formData)
    .then(res => {
         var status = res.status;
         res.json().then(
            (result) => {
            if(status == 200) {
              var tempList = result.resumes;
              for(var i = 0; i < tempList.length; i++) {
                if(tempList[i].sendBy.userImage != null) {
                  tempList[i].sendBy.userImage = window.$mediaURL + tempList[i].sendBy.userImage;
                  tempList[i].sendBy.cv = window.$mediaURL + tempList[i].sendBy.cv;
                }
              }
              setResumesList(tempList);
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
    function viewResume(event, user) {
      event.preventDefault();
      window. open(user.sendBy.cv, '_blank');
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
                  {resumesList.map((user, index) =>
                    <div class="result-box">
                      <div class="friend-box">
                      <div class="friend-name-box">
                        <a href="" onClick={(event) => {event.preventDefault();}}></a>
                        <div class="img-side">
                          <img src={user.sendBy.userImage} alt="User Image" />
                        </div>
                        <div class="name-side">
                          <h5>{user.sendBy.firstName + ' ' + user.sendBy.lastName}</h5>
                          <p>{user.sendBy.email}</p>
                        </div>
                      </div>
                      <div class="frind-box-btn">
                        <a href="" onClick={(event) => {viewResume(event, user)}} class="btn-main">View Resume</a>
                        {/* <a href="" onClick={(event) => {event.preventDefault();}} class="btn-main Delete">Delete</a> */}
                      </div>
                    </div>
                  </div>  
                  )}
              </div>
          </div>
        </section>
      </>
    );
  };
  
export default Resumes;