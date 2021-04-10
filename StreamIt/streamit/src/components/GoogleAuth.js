import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

export class GoogleAuth extends Component {
  // state = { isSignedIn: null };
  //now that we have moved our state of isSignedIn to redux
  //we don't need this component level state anymore
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "940525046698-6tlmq660qo9hh3o2849m34dira5tfk3d.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //we will not be updating any component level state so this is out
          // this.setState({
          //   isSignedIn: this.auth.isSignedIn.get(),
          // });

          this.onAuthChange(this.auth.isSignedIn.get());

          //listen functions infact passes a boolean true or false stating
          //weather the user is signed in or not
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn == null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="btn-outline-danger" onClick={this.onSignOutClick}>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="btn-outline-primary" onClick={this.onSignInClick}>
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
