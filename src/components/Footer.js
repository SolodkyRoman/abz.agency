import React, { Component } from "react";
import ReactSVG from "react-svg";

export default class Footer extends Component {
  state = {};

  render() {
    return (
      <footer>
        <div className="container">
          <div className="footer__row first">
            <a href="/" className="footer__logo">
              <ReactSVG src={require("../icons/logo.svg")} />
            </a>
            <ul className="footer__nav">
              <li>
                <a href="#about" className="footer__link">
                  About me
                </a>
              </li>
              <li>
                <a href="#relationships" className="footer__link">
                  Relationships
                </a>
              </li>
              <li>
                <a href="#requirements" className="footer__link">
                  Requirements
                </a>
              </li>
              <li>
                <a href="#users" className="footer__link">
                  Users
                </a>
              </li>
              <li>
                <a href="#signup" className="footer__link">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
        <span className="footer__line" />
        <div className="container">
          <div className="footer__row second">
            <ul className="footer__contacts">
              <li>
                <a
                  href="mailto:work.of.future@gmail.com"
                  className="footer__link"
                >
                  <ReactSVG src={require("../icons/mail.svg")} />
                  <span>work.of.future@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+380507892498" className="footer__link">
                  <ReactSVG src={require("../icons/phone.svg")} />
                  <span>+38 (050) 789 24 98</span>
                </a>
              </li>
              <li>
                <a href="tel:+380955560845" className="footer__link">
                  <ReactSVG src={require("../icons/cellphone.svg")} />
                  <span>+38 (095) 556 08 45</span>
                </a>
              </li>
            </ul>
            <div className="footer__links">
              <ul className="footer__links__list">
                <li>
                  <a href="#" className="footer__link">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Shop
                  </a>
                </li>
              </ul>
              <ul className="footer__links__list">
                <li>
                  <a href="#" className="footer__link">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Code
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Collaborate
                  </a>
                </li>
              </ul>
              <ul className="footer__links__list">
                <li>
                  <a href="#" className="footer__link">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Examples
                  </a>
                </li>
              </ul>
              <ul className="footer__links__list">
                <li>
                  <a href="#" className="footer__link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__row third">
            <span className="footer__copy">
              &copy; abz.agency specially for the test task
            </span>
            <ul className="footer__socials">
              <li>
                <a href="#">
                  <ReactSVG src={require("../icons/facebook.svg")} />
                </a>
              </li>
              <li>
                <a href="#">
                  <ReactSVG src={require("../icons/linkedin.svg")} />
                </a>
              </li>
              <li>
                <a href="#">
                  <ReactSVG src={require("../icons/instagram.svg")} />
                </a>
              </li>
              <li>
                <a href="#">
                  <ReactSVG src={require("../icons/twitter.svg")} />
                </a>
              </li>
              <li>
                <a href="#">
                  <ReactSVG src={require("../icons/pinterest.svg")} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}
