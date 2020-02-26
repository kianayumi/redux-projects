import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  //initialize library
  componentDidMount() {
    //.load() only signals when loading process completes
    //when passed a callback fxn
    window.gapi.load('client:auth2', () => {
      //async network req to API w/out callback fxn
      //returns Promise (obj that signals when client
      //library is initialized)
      window.gapi.client
        .init({
          clientId:
            '357463778359-4hrj4ughi4nerrkimn4si9pbbj8ja6pk.apps.googleusercontent.com',
          scope: 'email'
          //notice for when initialization complete
          //arrow fxn invoked when library initializes
        })
        //after initializing library
        .then(() => {
          //auth instance
          this.auth = window.gapi.auth2.getAuthInstance();
          //determines user login status
          this.onAuthChange(this.auth.isSignedIn.get());
          //listens for changes in user auth status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    //isSignedIn returns boolean true/false to indicate if user is signed in
    if (isSignedIn) {
      //every google user is assigned an ID, user ID will be google's user ID
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
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

//to get data from Redux store to components
const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
