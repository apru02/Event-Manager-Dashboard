import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import mybg from "./logos/20285469_6187456.svg";
import "../App.css";

const SigninComponent = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit_btn = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [googleSignInSuccess, setGoogleSignInSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here, e.g., send the data to the server
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.setMessage1("Loggen In successfully");
      props.setType1("success");
      props.setShowAlert1(true);
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 2000);
      navigate("/");
      window.location.reload();
    } else {
      props.setMessage1("Invalid credentials");
      props.setType1("danger");
      props.setShowAlert1(true);
      setGoogleSignInSuccess(false);
      setTimeout(() => {
        props.setShowAlert1(false);
      }, 3000);
    }
    // Clear form fields after submission
  };

  useEffect(() => {
    const typedOutElement = document.getElementById("demo");
    const illustratedimg = document.getElementById("signupillustratorimg");

    typedOutElement.classList.add("fade-in");
    illustratedimg.classList.add("fade-in");
    const handleSubmitWithGoogle = () => {
      if (googleSignInSuccess) {
        submit_btn.current.click();
        setGoogleSignInSuccess(false);
      }
    };

    handleSubmitWithGoogle();
    // setInterval(() => {
    //   handleSubmitWithGoogle();
    // }, 500);

    return () => {
      clearInterval(handleSubmitWithGoogle);
    };
  }, [googleSignInSuccess]);

  const responseGoogleSuccess = (response) => {
    const { profileObj } = response;
    const { email } = profileObj;
    setUsername(email.split("@")[0]);
    setPassword("12345678");

    setGoogleSignInSuccess(true);
    console.log("Google Sign-In Successful:", response);
  };

  // Handle Google sign-in failure
  const responseGoogleFailure = (error) => {
    console.log("Google Sign-In Failed:", error);
  };

  return (
    <div className="signupgrid">
      <div className="signupillustrator">
        <div className="typed-out" id="demo">
          <p
            style={{
              fontSize: "50px",
              display: "inline-block",
              marginBottom: "-10px",
            }}
          >
            J
          </p>
          oin the Excitement! Create, manage, and discover unforgettable
          experiences. Let's make every moment count together!
        </div>

        <img
          src={mybg}
          alt="illustration"
          id="signupillustratorimg"
          className="signupillustratorimg"
        />
      </div>
      <div className="SU">
        <div className="signup-container">
          <h2>Welcome to Event Manager dashboard!</h2>
          <h5>
            <Link to="http://localhost:3000/signup">Create an account</Link> or
            log in
          </h5>
          <hr className="signupHR" />
          <form className="signup-form">
            <div className="input_row">
              <label className="my_label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="signup-input"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>

            <div className="input_row">
              <label className="my_label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="signup-input"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button
              ref={submit_btn}
              onClick={handleSubmit}
              className="signup-button"
            >
              Login
            </button>
          </form>
        </div>
        <GoogleLogin
          clientId="154737886462-ef9cneipqh5p0j4pe561h1ofhmt1lpps.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
          render={(props) => (
            <button
              className="google-signin-button" // Apply custom class for styling
              onClick={props.onClick}
              disabled={props.disabled}
            >
              Sign in with Google
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default SigninComponent;
