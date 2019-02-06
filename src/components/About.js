import React from "react";
import ReactSVG from "react-svg";

export default class About extends React.Component {
  state = {};

  render() {
    return (
      <section className="about" id="about">
        <h2 className="about__heading">Let's get ac quainted</h2>
        <div className="container">
          <div className="about__content">
            <div className="about__content__image">
              <ReactSVG src={require("../images/man-mobile.svg")} />
            </div>
            <div className="about__content__info">
              <h3 className="about__content__info__heading">
                I am cool frontend developer
              </h3>
              <p className="about__content__info__p">
                When real users have a slow experience on mobile, they're much
                less likely to find what they are looking for or purchase from
                you in the future. For many sites this equates to a huge missed
                opportunity, especially when more than half of visits are
                abandoned if a mobile page takes over 3 seconds to load.
              </p>
              <p className="about__content__info__p">
                Last week, Google Search and Ads teams announced two new speed
                initiatives to help improve user-experience on the web.
              </p>
              <a href="#signup" className="button about__content__info__btn">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
