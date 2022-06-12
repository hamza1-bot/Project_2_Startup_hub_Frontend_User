export const userService = {
    signUp,
    login,
    editProfile,
    changePassword,
    getProfileData,
    forgotPassword,
    getMyPostsList,
    getPostsList,
    addPost,
    searchUsers,
    getOtherUserProfileData,
    sendResume,
    sendFriendRequest,
    getFriendRequests,
    acceptOrRejectFriendRequest,
    getFriends,
    removeFriend,
    removePost,
    getResumesList
};

//common header use when no authentication required
const header = {
    'Content-Type': 'application/json',
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

// common header use when authentication required
const headerWithToken = {
    'Content-Type': 'application/json',
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

// common header use when authentication required and need to send multipart data
const headerWithTokenForMultipart = {
    'deviceType': 'w',
    'deviceId': '123',
    'appVersion': '1.0'
};

// base url for apis
const baseURL = "http://localhost:8010/StartupHub/api/";

// sign up api call
function signUp(formData) {
    return fetch(baseURL + "signUp", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// login api call
function login(formData) {
    return fetch(baseURL + "login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to get profile data
function getProfileData() {
    return fetch(baseURL + "viewProfile", {
        method: "POST",
        body: JSON.stringify({"secretId" : localStorage.getItem("access_token")}),
        headers: header
    });
}

// api call to get my posts list
function getMyPostsList() {
    return fetch(baseURL + "getUserPost", {
        method: "POST",
        body: JSON.stringify({"secretId" : localStorage.getItem("access_token")}),
        headers: header
    });
}

// api call to get my posts list
function getPostsList() {
    return fetch(baseURL + "getPosts", {
        method: "POST",
        body: {},
        headers: header
    });
}

// api call to edit profile data
function editProfile(formData) {
    return fetch(baseURL + "editProfile", {
        method: "POST",
        body: formData,
        headers: headerWithTokenForMultipart
    });
}

// api call to change password
function changePassword(formData) {
    return fetch(baseURL + "changePassword", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: headerWithToken
    });
}

// api call to send request for forgot password
function forgotPassword(formData) {
    return fetch(baseURL + "forgotPassword", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to add post
function addPost(formData) {
    return fetch(baseURL + "addPost", {
        method: "POST",
        body: formData,
        headers: headerWithTokenForMultipart
    });
}

// api call to search users
function searchUsers(formData) {
    return fetch(baseURL + "searchUser", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to get other user profile data
function getOtherUserProfileData(formData) {
    return fetch(baseURL + "otherUserProfile", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to send resume
function sendResume(formData) {
    return fetch(baseURL + "sendResume", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call send friend request
function sendFriendRequest(formData) {
    return fetch(baseURL + "sendFriendRequest", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to get friend requests
function getFriendRequests(formData) {
    return fetch(baseURL + "receivedFriendRequest", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to accept or reject friend request
function acceptOrRejectFriendRequest(formData) {
    return fetch(baseURL + "acceptOrRejectFriendRequest", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to get friends list
function getFriends(formData) {
    return fetch(baseURL + "myFriendsList", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to remove friend from friend list
function removeFriend(formData) {
    return fetch(baseURL + "removeFriend", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to remove post
function removePost(formData) {
    return fetch(baseURL + "removePost", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}

// api call to get received resumes list
function getResumesList(formData) {
    return fetch(baseURL + "receivedResume", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header
    });
}