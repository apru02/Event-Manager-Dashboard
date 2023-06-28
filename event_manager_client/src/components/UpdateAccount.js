import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import "../App.css"; // Import the CSS file
import mybg from "./logos/20285469_6187456.svg";
import dp from "./logos/user.png";
const UpdateAccount = () => {
  const token = localStorage.getItem("token");
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imagesrc, setImagesrc] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const getuser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
   // console.log(json);
    setName(json.name);
    setEmail(json.email);
    setUsername(json.username);
    setUserid(json._id);
    setImagesrc(`http://localhost:5000/uploads/${json.photo}`);
  };
  useEffect(() => {
    getuser();

    // eslint-disable-next-line
  }, []);

  const changedp = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file); // Update the key to "photo" instead of "file"

    const response = await fetch(
      `http://localhost:5000/api/auth/changedp/${userid}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const json = await response.json();
    //console.log(json);
    if (json.success) {
      alert("Image Uploaded");
      const imageUrl = `http://localhost:5000/uploads/${json.user.photo}`; // Access the updated user object to get the photo property
      console.log(imageUrl);
      setImagesrc(imageUrl);
    }
  };

  const updateAcc = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/auth/updateuser/${userid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          name: Name,
          email: email,
        }),
      }
    );
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      alert("Account Updated");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  let navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
  const handleimginput = () => {
    const imginput = document.getElementById("imginput");
    imginput.click();
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
        ></img>
      </div>
      <div className="SU">
        <div className={containerClasses}>
          <h2>Welcome to Event Manager dashboard!</h2>
          <div className="my_dp">
            <img
              src={
                imagesrc !== ""
                  ? imagesrc
                  : dp
              }
              alt="profile"
              
              className="myprofilepic"
              onClick={handleimginput}
            />
          </div>
          <input
            type="file"
            id="imginput"
            style={{ display: "none" }}
            onChange={changedp}
          />
          <h3 style={{ textAlign: "center" }}>Update your account</h3>

          <hr className="signupHR"></hr>
          <h4>Your Username : {username}</h4>
          <form className={formClasses} onSubmit={updateAcc}>
            <div className="input_row">
              <label className="my_label" htmlFor="username">
                Name{" "}
              </label>
              <input
                type="text"
                id="username"
                className={inputClasses}
                value={Name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div className="input_row">
              <label className="my_label" htmlFor="email">
                E-mail{" "}
              </label>
              <input
                type="email"
                id="email"
                className={inputClasses}
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <button type="submit" className={buttonClasses}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
