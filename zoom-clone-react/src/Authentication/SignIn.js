import React from "react";
import { useMsal } from "@azure/msal-react";

const handleSignInClick = (instance) => {
  instance.loginPopup();
};

function SignInButton() {
  const { instance } = useMsal();

  return <button onClick={() => handleSignInClick(instance)}>Sign In</button>;
}

function SignIn() {
  return (
    <div>
      <SignInButton />
    </div>
  );
}

export default SignIn;
