import React from "react";
import { HashLink } from 'react-router-hash-link';

const Slider = props => {

  return (
    <div className="slider-container">
      <div className="slider">
        <div className="slides">
          <div id="slides__1" className="slide">
              <div className="slide-content">
                <p className="slide__text">Create A Project To Keep Track Of Your Progress!</p>
              </div>
              <HashLink className="slide__prev" to="#slides__4" title="Next"></HashLink>
              <HashLink className="slide__next" to="#slides__2" title="Next"></HashLink>
          </div>
          <div id="slides__2" className="slide">
            <div className="slide-content">
              <span className="slide__text">Create A Task To Add To Your Project</span>
            </div>
            <HashLink className="slide__prev" to="#slides__1" title="Prev"></HashLink>
            <HashLink className="slide__next" to="#slides__3" title="Next"></HashLink>
          </div>
          <div id="slides__3" className="slide">
            <div className="slide-content">
              <span className="slide__text">Check Off A Task To Track Completion</span>
            </div>
            <HashLink className="slide__prev" to="#slides__2" title="Prev"></HashLink>
            <HashLink className="slide__next" to="#slides__4" title="Next"></HashLink>
          </div>
          <div id="slides__4" className="slide">
            <div className="slide-content">
              <span className="slide__text">Assign A User A Task</span>
            </div>
            <HashLink className="slide__prev" to="#slides__3" title="Prev"></HashLink>
            <HashLink className="slide__next" to="#slides__1" title="Prev"></HashLink>
          </div>
        </div>
        <div className="slider__nav">
          <HashLink className="slider__navlink" to="#slides__1"></HashLink>
          <HashLink className="slider__navlink" to="#slides__2"></HashLink>
          <HashLink className="slider__navlink" to="#slides__3"></HashLink>
          <HashLink className="slider__navlink" to="#slides__4"></HashLink>
        </div>
      </div>
    </div>
  )
}

export default Slider;