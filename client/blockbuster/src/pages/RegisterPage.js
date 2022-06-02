import React from "react";

import Header from "../Header/Header";
import RegisterForm from "../UserForms/RegisterForm";

import "./SignInPage.css";

function RegisterPage() {
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
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
