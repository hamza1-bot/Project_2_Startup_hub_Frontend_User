import { Route, Switch } from "react-router";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import EditProfile from "../components/EditProfile/EditProfile";
import FindFriend from "../components/FindFriend/FindFriend";
import MyProfile from "../components/MyProfile/MyProfile";
import OtherUserProfile from "../components/OtherUserProfile/OtherUserProfile";
import FriendRequests from "../components/FriendRequests/FriendRequests";
import Friends from "../components/Friends/Friends";
import Resumes from "../components/Resumes/Resumes";
import Posts from "../components/Posts/Posts";
import ChangePassword from "../components/ChangePassword/ChangePassword";

// All page routing has performed in this component
const routing = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
    <Route path="/forgot_password" exact component={ForgotPassword} />
    <Route path="/edit_profile" exact component={EditProfile} />
    <Route path="/change_password" exact component={ChangePassword} />

    <Route path="/find_friend" exact component={FindFriend} />
    <Route path="/friend_requests" exact component={FriendRequests} />
    <Route path="/friends" exact component={Friends} />
    <Route path="/my_profile" exact component={MyProfile} />
    <Route path="/other_user_profile" exact component={OtherUserProfile} />
    <Route path="/resumes" exact component={Resumes} />
    <Route path="/posts" exact component={Posts} />
  </Switch>
);

export default routing;