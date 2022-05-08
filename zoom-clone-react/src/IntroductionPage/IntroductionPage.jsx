import React, { useEffect } from "react";
import "./IntroductionPage.css";
import logo from "../resources/images/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

const handleSignInClick = (instance) => {
  instance.loginRedirect();
};

function SignInButton() {
  const { instance } = useMsal();
  return (
    <button
      className="signin_button"
      onClick={() => handleSignInClick(instance)}
    >
      Sign In
    </button>
  );
}

function IntroductionPage(props) {
  const { setIsRoomHostAction } = props;

  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} alt="logo" className="introduction_page_image" />
        <AuthenticatedTemplate>
          <ConnectingButtons />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="connecting_buttons_container">
            <SignInButton />
          </div>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapDispatchToProps)(IntroductionPage);
