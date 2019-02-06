import React from "react";
import ReactSVG from "react-svg";

export default class Header extends React.Component {
  state = {
    name: null,
    email: null,
    imageSrc: null,
    menu: false
  };

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://frontend-test-assignment-api.abz.agency/api/v1/users/1",
      false
    );
    xhr.send();

    if (xhr.status === 200) {
      let response;
      try {
        response = JSON.parse(xhr.responseText).user;
      } catch (error) {
        console.log(error);
        return;
      }

      this.setState({
        imageSrc: response.photo,
        name: response.name,
        email: response.email
      });
    }
  }

  openMenu = () => {
    document.body.style.overflow = "hidden";
    this.setState({ menu: true });
  };

  closeMenu = () => {
    document.body.style.overflow = "auto";
    this.setState({ menu: false });
  };

  render() {
    const { name, email, imageSrc } = this.state;
    return (
      <header className="header">
        <div className="desktop-header">
          <div className="container">
            <div className="header__content">
              <a href="/" className="header__logo">
                <ReactSVG src={require("../icons/logo.svg")} />
              </a>
              <nav className="header__navigation">
                <ul className="header__navigation__list">
                  <li>
                    <a href="#about">About me</a>
                  </li>
                  <li>
                    <a href="#relationships">Relationships</a>
                  </li>
                  <li>
                    <a href="#requirements">Requirements</a>
                  </li>
                  <li>
                    <a href="#users">Users</a>
                  </li>
                  <li>
                    <a href="#signup">Sign Up</a>
                  </li>
                </ul>
              </nav>

              <div className="account">
                <div className="account__info">
                  <div className="account__info__name">{name}</div>
                  <div className="account__infot__email">{email}</div>
                </div>
                <a href="/" className="account__avatar">
                  <img
                    src={imageSrc}
                    alt="avatar"
                    className="account__avatar__img"
                  />
                </a>
                <button className="account__exit-btn">
                  <ReactSVG src={require("../icons/sign-out.svg")} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-header">
          <div className="container">
            <a href="/" className="mobile-header__logo">
              <ReactSVG src={require("../icons/logo.svg")} />
            </a>
            <button
              href="/"
              className="mobile-header__menu button"
              onClick={this.openMenu}
            >
              <ReactSVG src={require("../icons/line-menu.svg")} />
            </button>
          </div>
        </div>
        <div className={"mobile-menu " + (this.state.menu ? "active" : "")}>
          <div className="mobile-menu__header">
            <img
              src={imageSrc}
              alt="avatar"
              className="mobile-menu__header__avatar"
            />
            <p className="mobile-menu__header__name">{name}</p>
            <p className="mobile-menu__header__email">{email}</p>
          </div>
          <nav className="mobile-menu__nav">
            <ul>
              <li>
                <a onClick={this.closeMenu} href="#about">
                  About me
                </a>
              </li>
              <li>
                <a onClick={this.closeMenu} href="#relationships">
                  Relationships
                </a>
              </li>
              <li>
                <a onClick={this.closeMenu} href="#requirements">
                  Requirements
                </a>
              </li>
              <li>
                <a onClick={this.closeMenu} href="#users">
                  Users
                </a>
              </li>
              <li>
                <a onClick={this.closeMenu} href="#signup">
                  Sign up
                </a>
              </li>
              <li>
                <a onClick={this.closeMenu} href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={"page-hover " + (this.state.menu ? "active" : "")}
          onClick={this.closeMenu}
        />
      </header>
    );
  }
}
