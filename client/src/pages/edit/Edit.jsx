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
    phone: "",
    city: "",
    desc: "",
  });
  const [mentorStatus, setMentorStatus] = useState(null);


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
          phone: currentUser.phone,
          city: currentUser.city,
          desc: currentUser.desc
        };
        setUser(userData);
        setMentorStatus(userData.isSeller);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  console.log("test: " + user.isSeller);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ''; // Return empty string if phone number is not provided
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  };
  

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
    setMentorStatus((prevStatus) => !prevStatus);
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
              <input type="checkbox" onChange={handleSeller} checked={mentorStatus}/>
              <span className="slider round"></span>
            </label>
          </div>
          {mentorStatus && (
            <>
              <label htmlFor="">Phone Number</label>
              <input
                name="phone"
                type="text"
                placeholder= {formatPhoneNumber(user.phone) || "+1 (XXX) XXX-XXXX"}
                onChange={handleChange}
              />
              <label htmlFor="">City</label>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={user.city || ''}
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
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Edit;
