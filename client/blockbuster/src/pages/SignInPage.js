import React from "react";

import Header from "../Header/Header";
import SignInForm from "../UserForms/SignInForm";

import "./SignInPage.css";

function SignInPage() {
  return (
    <div
      className="mainContainer"
      style={{
        backgroundImage: "url(/blockbusterstore.jpeg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: "100vw",
        height: "100vh"
      }}
    >
      <Header />
      <SignInForm />
    </div>
  );
}

export default SignInPage;
