import profile from "../../assets/images/profile.jpg"
import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import { useHistory } from "react-router";

// Edit profile component
const ChangePassword = (props) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');

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
        } else {
            $('.classBeforeLogin').show();
            $('.classAfterLogin').hide();
        }
    }, []);

    // method to update profile data
    function changePassword(event) {
        event.preventDefault();
      
        var formData = {
    	    "currentPassword" : currentPassword,
            "password" : password,
    	    "secretId" : localStorage.getItem('access_token')
    	}
        userService.changePassword(formData)
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setCurrentPassword("");
                    setPassword("");
                    toast.success(result.message, { hideProgressBar: true });
                    history.push('/home');
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
                    <div class="col-md-12">
                        <div class="white-box Edit-profile">
                            <h6 class="box-title" style = {{fontSize: "24px",paddingBottom: "21px"}}>Change Password</h6>
                            <form action="">
                                <div class="form-group">
                                    <label for="">Current Password</label>
                                    <input type="password" placeholder="" value={currentPassword} onChange={(event) => {setCurrentPassword(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Password</label>
                                    <input type="password" placeholder="" value={password} onChange={(event) => {setPassword(event.target.value);}} required />
                                </div>
                            </form>
                            <a href="" onClick={(event) => {changePassword(event)}} class="update-btn">Update</a>
                            <a href="" class="cancel-btn">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
      </>
    );
  };
  
export default ChangePassword;