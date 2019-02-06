import React from "react";
import ReactSVG from "react-svg";

export default class Relationships extends React.Component {
  state = {};

  render() {
    return (
      <section className="relations" id="relationships">
        <h2 className="relations__heading">
          About my relationships with web-development
        </h2>
        <div className="container">
          <div className="flex">
            <article className="relations__skill">
              <ReactSVG src={require("../icons/html.svg")} />
              <div className="relations__skill__info">
                <h3 className="relations__skill__heading">
                  I'm in love with HTML
                </h3>
                <p className="relations__skill__text">
                  Hypertext Markup Language (HTML) is the standard markup
                  language for creating web pages and web applications.
                </p>
              </div>
            </article>
            <article className="relations__skill">
              <ReactSVG src={require("../icons/css.svg")} />
              <div className="relations__skill__info">
                <h3 className="relations__skill__heading">
                  CSS is my best friend
                </h3>
                <p className="relations__skill__text">
                  Cascading Style Sheets (CSS) is a style sheet language used
                  for describing the presentation of a document written in a
                  markup language like HTML.
                </p>
              </div>
            </article>
            <article className="relations__skill">
              <ReactSVG src={require("../icons/javascript.svg")} />
              <div className="relations__skill__info">
                <h3 className="relations__skill__heading">
                  JavaScript is my passion
                </h3>
                <p className="relations__skill__text">
                  JavaScript is a high-level, interpreted programming language.
                  It is a language which is also characterized as dynamic,
                  weakly typed, prototype-based and multi-paradigm.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    );
  }
}
