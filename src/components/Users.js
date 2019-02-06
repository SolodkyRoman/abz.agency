import React from "react";
import UserArticle from "./UserArticle";

export default class Users extends React.Component {
  state = {
    users: [],
    startLink:
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6",
    nextLink:
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = refresh => {
    let xhr = new XMLHttpRequest();
    let link;
    let arr;

    if (!refresh) {
      arr = [];
      link = this.state.startLink;
    } else {
      arr = this.state.users;
      link = this.state.nextLink;
    }

    xhr.open("GET", link, false);
    xhr.send();

    if (xhr.status === 200) {
      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch (error) {
        console.log(error);
        return;
      }

      arr.length ? (arr = arr.concat(response.users)) : (arr = response.users);

      this.setState({
        users: arr,
        nextLink: response.links.next_url
      });
    }
  };

  render() {
    const { users, nextLink } = this.state;
    let content = "";

    if (users.length) {
      content = users.map((user, index) => (
        <UserArticle
          key={user.id}
          person={{
            avatar: user.photo,
            name: user.name,
            appointment: user.position,
            email: user.email,
            phone: user.phone
          }}
        />
      ));
    }

    return (
      <section className="users" id="users">
        <h2 className="users__heading">Our cheerful users</h2>
        <p className="users__attention text-center">
          Attention! Sorting users by registration date
        </p>
        <div className="container">
          <div className="flex">{content}</div>
          <div className="text-center">
            <button
              className="button users__show-more"
              style={{ display: nextLink ? "inline-flex" : "none" }}
              onClick={this.loadUsers}
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    );
  }
}
