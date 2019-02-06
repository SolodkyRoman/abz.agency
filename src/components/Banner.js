import React from "react";

export default class Banner extends React.Component {
  state = {};

  render() {
    return (
      <section className="banner">
        <div className="container">
          <div className="flex">
            <div className="banner__content">
              <h1>Test assignment for Frontend Developer position</h1>
              <p>
                We kindly remind you that your test assignment should be
                submitted as a link to github/bitbucket repository.{" "}
                <span>
                  Please be patient, we consider and respond to every
                  application that meets minimum requirements. We look forward
                  to your submission. Good luck!
                </span>
              </p>
              <a href="#signup" className="button banner__signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
