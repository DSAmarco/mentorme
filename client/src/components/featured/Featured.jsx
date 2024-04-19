import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>mentorship</span> opportunities in your niche
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "City life in London"'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Japanese Cuisine</button>
            <button>Canadian Landmarks</button>
            <button>Archery</button>
            <button>French Desserts</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/woman1.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
