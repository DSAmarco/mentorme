import React, { useState, useEffect } from "react";
import upload from "../../utils/upload";
import "./Edit.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";


function Edit() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    originalUsername: "",
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    city: "",
    isSeller: false,
    desc: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's existing information and populate the form fields
    const fetchUserData = async () => {
      try {
        const currentUser = getCurrentUser(); // Assuming this endpoint returns user data
        const userData = {
          originalUsername: currentUser.username,
          username: currentUser.username,
          email: currentUser.email,
          password: currentUser.password,
          img: currentUser.img,
          country: currentUser.country,
          isSeller: currentUser.isSeller,
          desc: currentUser.desc
        };
        setUser(userData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.put("/auth/edit", {
        ...user,
        img: url || user.img,
      });
      navigate("/")
    } catch (err) {
      setErrorMessage("Failed to update user information. Please try again.");
      console.log(err);
    }
  };
  return (
    <div className="edit">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Edit your account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={user.username || ''}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email || ''}
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={user.country || ''}
            onChange={handleChange}
          />
          <button type="submit">Save Changes</button>
        </div>
        <div className="right">
          <h1>I want to become a Mentor</h1>
          <div className="toggle">
            <label htmlFor="">Activate the Mentor account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 (XXX) XXX-XXXX"
            onChange={handleChange}
          />
          <label htmlFor="">City</label>
          <input
            name="phone"
            type="text"
            placeholder="City"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Edit;
