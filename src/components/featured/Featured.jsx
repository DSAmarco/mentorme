import React from 'react'
import "./Featured.scss"
 
const Featured = () => {
    return (
        <div className="featured">
            <div className="container">
                <div className="left"></div>
                    <h1>Find the perfect freelance services for your business</h1>
                        <div className="search">
                            <div className="searchIput">
                                <img src="" alt="" />
                                <input type="text" placeholder='Try "building mobile app"'/>
                            </div>
                        <button>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button>Web Design</button>
                        <button>Wordpress</button>
                        <button>Logo Design</button>
                        <button>AI Service</button>
                    </div>
                    <div className="right">
                        <img src="" alt=""/>
                    </div>
            </div>
        </div>
    )
}

export default Featured