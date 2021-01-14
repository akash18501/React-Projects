import { Button } from "@material-ui/core";
import React from "react";
import "./login.css";
import { auth, provider } from "../../firebase";
import { userAction } from "../../actions";
import { connect } from "react-redux";

const Login = ({ userAction, user }) => {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("result is", result);
        userAction(result.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="whatsapplogo"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, {
  userAction: userAction,
})(Login);
