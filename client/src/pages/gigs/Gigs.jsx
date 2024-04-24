import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();

  const { search } = useLocation();
  const firstParam = search.split('&')[0];

  const [cityActive, setCityActive] = useState(false);
  const [cultureActive, setCultureActive] = useState(false);
  const [foodActive, setFoodActive] = useState(false);
  const [activityActive, setActivityActive] = useState(false);
  const [applyUpdate, setApplyUpdate] = useState(false);


  const [searchUpdate, setSearch] = useState('');

  /*const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });*/

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => {
      let queryString = "/gigs";
      if (search.includes("cat")) {
        if (search.includes("city")) {
          handleToggle('City')
        }
        else if (search.includes("culture")) {
          handleToggle('Culture')
        }
        else if (search.includes("food")) {
          handleToggle('Food')
        }
        else if (search.includes("activity")) {
          handleToggle('Activity')
        }
        queryString += searchUpdate;
      }
      else {
        queryString += search;
      }
      queryString += `&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`;
      console.log("query string : " + queryString);
      return newRequest.get(queryString).then((res) => res.data);
    },
  });

  console.log(data);
  console.log(search);
  console.log("test" + searchUpdate);


  const handleToggle = (city) => {
    if ((city === 'City' && cityActive) ||
      (city === 'Culture' && cultureActive) ||
      (city === 'Food' && foodActive) ||
      (city === 'Activity' && activityActive)) {
      return;
    }

    setCityActive(city === 'City' ? !cityActive : false);
    setCultureActive(city === 'Culture' ? !cultureActive : false);
    setFoodActive(city === 'Food' ? !foodActive : false);
    setActivityActive(city === 'Activity' ? !activityActive : false);
    setApplyUpdate(true);

    switch (city) {
      case 'City':
        setSearch(!cityActive ? "?cat=city" : '');
        if (!cityActive) {
          if (search.includes("search"))
            navigate(`/gigs${firstParam}&cat=city`)
          else
            navigate("/gigs?cat=city");
        }
        break;
      case 'Culture':
        setSearch(!cultureActive ? '?cat=culture' : '');
        if (!cultureActive) {
          if (search.includes("search"))
            navigate(`/gigs${firstParam}&cat=culture`)
          else
            navigate("/gigs?cat=culture");
        }
        break;
      case 'Food':
        setSearch(!foodActive ? '?cat=food' : '');
        {
          if (search.includes("search"))
            navigate(`/gigs${firstParam}&cat=food`)
          else
            navigate("/gigs?cat=food");
        }
        break;
      case 'Activity':
        setSearch(!activityActive ? '?cat=activity' : '');
        {
          if (search.includes("search"))
            navigate(`/gigs${firstParam}&cat=activity`)
          else
            navigate("/gigs?cat=activity");
        }
        break;
      default:
        setSearch('');
    }
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    setApplyUpdate(false)
    refetch();
  };

  const handleChange = () => {
    setApplyUpdate(true);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">MentorMe {">"} Mentors</span>
        <h1>Mentorship Opportunities</h1>
        <p>
          Explore, discover, and create with our skilled Mentors!
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" onChange={handleChange} />
            <input ref={maxRef} type="number" placeholder="max" onChange={handleChange} />
            <button
              className={cityActive ? 'button-active' : 'button-inactive'}
              onClick={() => handleToggle('City')}>
              City
            </button>
            <button
              className={cultureActive ? 'button-active' : 'button-inactive'}
              onClick={() => handleToggle('Culture')}>
              Culture
            </button>
            <button
              className={foodActive ? 'button-active' : 'button-inactive'}
              onClick={() => handleToggle('Food')}>
              Food
            </button>
            <button
              className={activityActive ? 'button-active' : 'button-inactive'}
              onClick={() => handleToggle('Activity')}>
              Activity
            </button>
          </div>
          <div className="applyButton">
            <button
              className={applyUpdate ? 'button-active' : 'button-inactive'}
              onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : sort === "createdAt" ? "Newest" : "Popular"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("totalStars")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
              ? "Something went wrong!"
              : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
