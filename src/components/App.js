import React, { Component } from "react";
import "../styles/main.sass";
import Header from "./Header";
import Banner from "./Banner";
import About from "./About";
import Relationships from "./Relationships";
import Requirements from "./Requirements";
import Users from "./Users";
import SignUp from "./SignUp";
import Footer from "./Footer";
import Modals from "./Modals";

class App extends Component {
  state = {
    users: React.createRef(),
    modals: React.createRef()
  };

  updateUsersList = () => {
    this.state.users.current.loadUsers(false);
  };

  showModal = (status, text) => {
    this.state.modals.current.showModal(status, text);
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Banner />
        <About />
        <Relationships />
        <Requirements />
        <Users ref={this.state.users} />
        <SignUp
          updateUsersList={this.updateUsersList}
          showModal={this.showModal}
        />
        <Footer />
        <Modals ref={this.state.modals} />
      </div>
    );
  }
}

export default App;
