import React, { useState } from "react";
import classNames from "classnames";
import "../App.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import mybg from "./logos/20285469_6187456.svg";
import { useEffect } from "react";

const SigninComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform signup logic here, e.g., send the data to the server
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
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid credentials");
    }
    // Clear form fields after submission

    setUsername("");
    setPassword("");
  };

  // CSS classes using classNames package
  const containerClasses = classNames("signup-container");
  const formClasses = classNames("signup-form");
  const inputClasses = classNames("signup-input");
  const buttonClasses = classNames("signup-button");
  useEffect(() => {
    const typedOutElement = document.getElementById("demo");
    const illustratedimg = document.getElementById("signupillustratorimg");

    typedOutElement.classList.add("fade-in");
    illustratedimg.classList.add("fade-in");
  }, []);

  return (
    <div className="signupgrid">
      <div className="signupillustrator">
        <div class="typed-out" id="demo">
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
        ></img>
      </div>
      <div className="SU">
        <div className={containerClasses}>
          <h2>Welcome to Event Manager dashboard!</h2>
          <h5>
            <Link to="http://localhost:3000/signup">Create an account</Link> or
            log in
          </h5>
          <hr className="signupHR"></hr>
          <form className={formClasses} onSubmit={handleSubmit}>
            <div className="input_row">
              <label className="my_label" htmlFor="username">
                Username{" "}
              </label>
              <input
                type="text"
                id="username"
                className={inputClasses}
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>

            <div className="input_row">
              <label className="my_label" htmlFor="password">
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                className={inputClasses}
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button type="submit" className={buttonClasses}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
