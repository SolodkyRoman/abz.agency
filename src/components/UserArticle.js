import React from "react";
import defaultAvatar from "../images/users/default-avatar.png";

export default class UserArticle extends React.Component {
  state = {
    person: {
      avatar: { value: null, tooltip: null },
      name: { value: null, tooltip: null },
      appointment: { value: null, tooltip: null },
      email: { value: null, tooltip: null },
      phone: { value: null, tooltip: null }
    }
  };

  // Cut long values if they can't be transferred to another line
  substrProperties(value, length) {
    let words = value.split(" ");

    // Search for a too long word
    words.forEach(element => {
      if (element.length >= length)
        return {
          tooltip: element,
          value: element.substring(0, length - 3) + "..."
        };
    });

    return {
      tooltip: value,
      value: value.substring(0, length - 3) + "..."
    };
  }

  componentDidMount() {
    let prop = this.props.person;
    let person = this.state.person;
    let tooltip;
    let maxLength;

    // Check the length of values
    for (let key in prop) {
      tooltip = "";

      // Max name length is 20 chars
      if (key === "name") {
        maxLength = 18;
      }
      // Max length of other values is 40 chars
      if (key !== "name") {
        maxLength = 30;
      }

      // Handle the long value, if the value isn't a source of the image
      if (prop[key].length >= maxLength && key !== "avatar") {
        let { value, tooltip } = this.substrProperties(prop[key], maxLength);
        person[key].value = value;
        person[key].tooltip = tooltip;
      } else {
        person[key].value = prop[key];
        person[key].tooltip = tooltip;
      }
    }

    this.setState({ person: person });
  }

  showTooltip = e => {
    let tooltipSpan = e.target.querySelector(".tooltip");
    if (tooltipSpan) {
      let x = e.clientX,
        y = e.clientY;

      tooltipSpan.style.top = y + 14 + "px";
      tooltipSpan.style.left = x + 10 + "px";
    }
  };

  render() {
    const { avatar, name, appointment, email, phone } = this.state.person;

    return (
      <article className="users__person">
        <div className="users__person__avatar">
          <img
            src={avatar.value}
            alt={name.value}
            onError={e => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
        </div>
        <div className="users__person__info">
          <h3
            className="users__person__info__name"
            onMouseMove={this.showTooltip}
          >
            {name.value}
            {name.tooltip ? (
              <span className="tooltip">{name.tooltip}</span>
            ) : (
              ""
            )}
          </h3>
          <p className="users__person__info__p" onMouseMove={this.showTooltip}>
            {appointment.value}
            {appointment.tooltip ? (
              <span className="tooltip">{appointment.tooltip}</span>
            ) : (
              ""
            )}
          </p>
          <p className="users__person__info__p" onMouseMove={this.showTooltip}>
            {email.value}
            {email.tooltip ? (
              <span className="tooltip">{email.tooltip}</span>
            ) : (
              ""
            )}
          </p>
          <p className="users__person__info__p" onMouseMove={this.showTooltip}>
            {phone.value}
            {phone.tooltip ? (
              <span className="tooltip">{phone.tooltip}</span>
            ) : (
              ""
            )}
          </p>
        </div>
      </article>
    );
  }
}
