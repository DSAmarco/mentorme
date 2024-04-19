import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/Slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={4} arrowsScroll={2}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
            <Link to="/gigs?cat=design">
              <img
                src="/public/img/city.png"
                alt=""
              />
              </Link>
              
              <div className="line"></div>
              <span>City</span>
            </div>
            <div className="item">
            <Link to="/gigs?cat=design">
              <img
                src="/public/img/culture.png"
                alt=""
              />
               </Link>
              <div className="line"></div>

              <span>Culture</span>
            </div>
            <div className="item">
            <Link to="/gigs?cat=design">
              <img
                src="/public/img/food.png"
                alt=""
              />
              </Link>
              <div className="line"></div>
              <span>Food</span>
            </div>
            <div className="item">
            <Link to="/gigs?cat=design">
              <img
                src="/public/img/activity.png"
                alt=""
              />
              </Link>
              <div className="line"></div>
              <span>Activity</span>
            </div>
            

            
          </div>
        </div>
      </div>
      
      {/*<Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>*/}
    </div>
  );
}

export default Home;
