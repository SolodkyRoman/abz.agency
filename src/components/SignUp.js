import React from "react";
import ReactSVG from "react-svg";

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    position: null,
    imageInput: React.createRef(),
    fileName: "Upload your photo",
    options: [],
    defaultOption: <option value="placeholder">Select your position</option>,
    disabled: true,
    errorName: false,
    errorEmail: false,
    errorPhone: false,
    errorPosition: false,
    errorFile: false,
    firstTryName: 0,
    firstTryEmail: true,
    firstTryPhone: true
  };

  activateSubmitBtn() {
    if (this.state.name && !this.state.errorName)
      if (this.state.email && !this.state.errorEmail)
        if (this.state.phone && !this.state.errorPhone)
          if (this.state.position && !this.state.errorPosition)
            if (this.state.imageInput.current.files[0]) {
              this.setState({ disabled: false });
              return;
            }

    if (this.state.disabled === false) this.setState({ disabled: true });
  }

  // Load positions
  componentDidMount() {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions",
      false
    );
    xhr.send();

    if (xhr.status === 200) {
      try {
        let response = JSON.parse(xhr.responseText).positions;
        this.setState({
          options: response
        });
      } catch (e) {
        alert(e);
      }
    }
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value }, () => {
      // Do not valide the name, if the user entering his name for the first time
      if (this.state.firstTryName < 2)
        this.setState({ firstTryName: this.state.firstTryName + 1 });
      else this.validateName();
    });
  };

  validateName = () => {
    let name = this.state.name;

    let success = name.length >= 2 && name.length <= 60;
    this.setState({ errorName: !success }, () => this.activateSubmitBtn());
    return success;
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value }, () => {
      // Validate phone until it is incorrect
      if (!this.state.firstTryEmail) {
        this.validateEmail();
      }
    });
  };

  validateEmail = () => {
    let email = this.state.email;

    if (this.state.firstTryEmail) {
      this.setState({ firstTryEmail: false });
    }

    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let success = reg.test(email);
    this.setState({ errorEmail: !success }, () => this.activateSubmitBtn());
    return success;
  };

  handlePhoneChange = e => {
    let phone = e.target.value;
    let prevPhone = this.state.phone;
    phone = phone.replace(/\+38|\(|\)|_|\s/g, "");

    if (!/^\d+$/.test(phone) && phone.length) {
      return;
    }

    switch (phone.length) {
      case 0:
        phone = "";
        break;

      case 1:
      case 2:
        phone = "+38 (" + phone;
        break;

      case 3:
        phone = "+38 (" + phone + ")";
        break;

      case 4:
      case 5:
      case 6:
        phone = "+38 (" + phone.substring(0, 3) + ") " + phone.substring(3, 6);
        break;

      case 7:
      case 8:
        phone =
          "+38 (" +
          phone.substring(0, 3) +
          ") " +
          phone.substring(3, 6) +
          " " +
          phone.substring(6, 8);
        break;

      default:
        phone =
          "+38 (" +
          phone.substring(0, 3) +
          ") " +
          phone.substring(3, 6) +
          " " +
          phone.substring(6, 8) +
          " " +
          phone.substring(8, 10);
        break;
    }

    if (phone.length === prevPhone.length) {
      phone = phone.substring(0, phone.length - 2);
    }

    if (phone.length === 5 && prevPhone.length === 6) {
      phone = "";
    }

    this.setState({ phone: phone }, () => {
      if (!this.state.firstTryPhone) {
        this.validatePhone();
      }
    });
  };

  validatePhone = () => {
    if (this.state.firstTryPhone) {
      this.setState({ firstTryPhone: false });
    }
    let phone = this.state.phone;

    phone = phone.replace(/\(|\)|_|\s/g, "");
    let reg = /^\+380/;
    let success = reg.test(phone) && phone.length === 13;

    if (success) {
      this.setState({ errorPhone: false }, () => this.activateSubmitBtn());
    } else {
      this.setState({ errorPhone: true }, () => this.activateSubmitBtn());
    }
    return success;
  };

  handlePositionChange = e => {
    this.setState({ position: e.target.value }, () => this.validatePosition());
  };

  validatePosition = p => {
    let position = this.state.position;

    if (position > 0) {
      this.setState(
        {
          position: position,
          errorPosition: false,
          defaultOption: ""
        },
        () => this.activateSubmitBtn()
      );
      return true;
    }

    this.setState({ position: null, errorPosition: true }, () =>
      this.activateSubmitBtn()
    );
    return false;
  };

  handleFileChange = e => {
    let imageInput = this.state.imageInput.current;
    let fileName;
    if (imageInput.files[0]) {
      fileName = imageInput.files[0].name;

      // Update file's name
      let fileType = fileName.split(".").pop();

      if (fileName.length >= 25)
        fileName = fileName.substring(0, 16) + "... (" + fileType + ")";
    } else {
      fileName = "Upload your photo";
    }

    this.setState({ fileName: fileName });
    this.validateFile();
  };

  // Initiate input[type='file'] click
  uploadClick = e => {
    this.state.imageInput.current.click();
  };

  validateFile = f => {
    let imageInput = this.state.imageInput.current;

    // If there is no file
    if (!imageInput.files[0]) {
      this.setState({ errorFile: true });
      this.activateSubmitBtn();
      return false;
    }

    // Check the format
    let extension = imageInput.files[0].name.split(".").pop();
    if (extension !== "jpeg" && extension !== "jpg") {
      this.props.showModal("Error", "The file must have jpeg/jpg extension");
      imageInput.value = "";
      this.setState({ fileName: "Upload your photo", errorFile: true }, () =>
        this.activateSubmitBtn()
      );
      return false;
    }

    // Check file's size
    if (imageInput.files[0].size / 1024 / 1024 >= 5) {
      this.props.showModal("Error", "The file must be smaller than 5 MB");
      imageInput.value = "";
      this.setState(
        { fileName: "Upload your photo", errorFile: true },
        () => this.activateSubmitBtn(),
        () => this.activateSubmitBtn()
      );
      return false;
    }

    // Check a resolution
    let img = new Image();
    img.src = window.URL.createObjectURL(imageInput.files[0]);

    img.onload = () => {
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);

      if (width < 70 || height < 70) {
        this.props.showModal(
          "Error",
          "The minimum resolution of the image is 70x70"
        );
        imageInput.value = "";
        this.setState({ fileName: "Upload your photo", errorFile: true }, () =>
          this.activateSubmitBtn()
        );
        return false;
      }
    };

    this.setState({ errorFile: false }, () => this.activateSubmitBtn());
    return true;
  };

  submitForm = e => {
    e.preventDefault();

    // Control fields' check
    let nameCheck = this.validateName();
    let emailCheck = this.validateEmail();
    let phoneCheck = this.validatePhone();
    let positionCheck = this.validatePosition();
    let fileCheck = this.validateFile();

    if (nameCheck && emailCheck && phoneCheck && positionCheck && fileCheck) {
      let formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("email", this.state.email);
      formData.append("phone", this.state.phone.replace(/\(|\)|_|\s/g, ""));
      formData.append("position_id", this.state.position);
      formData.append("photo", this.state.imageInput.current.files[0]);

      let xhr = new XMLHttpRequest();
      // Get a token
      xhr.open(
        "GET",
        "https://frontend-test-assignment-api.abz.agency/api/v1/token",
        false
      );
      xhr.send();
      let token;
      try {
        token = JSON.parse(xhr.responseText).token;
      } catch (e) {
        alert(e);
        return;
      }

      // Send data
      xhr.open(
        "POST",
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        false
      );
      xhr.setRequestHeader("Token", token);
      xhr.send(formData);

      // Handle server's response
      // 200 Success
      if (xhr.status === 201) {
        this.props.showModal(
          "Congratulations",
          "You have successfully passed the registration"
        );

        // Clear form
        this.setState({
          name: "",
          email: "",
          phone: "",
          position: "placeholder",
          fileName: "Upload your photo"
        });

        // Remove file
        this.state.imageInput.current.value = "";
      }
      // 409 Phone or email already exists
      else if (xhr.status === 409) {
        this.props.showModal(
          "Error",
          "User with this phone or email already exists"
        );
        this.setState({ errorPhone: true, errorEmail: true });
        return;
      }
      // 401 The token expired / 422 Validation failed
      else {
        this.props.showModal("Error", "Something is wrong with request");
        return;
      }

      console.log(xhr.responseText);
      // Update users' list
      this.props.updateUsersList();
    }
  };

  render() {
    const {
      name,
      email,
      phone,
      fileName,
      options,
      defaultOption,
      errorEmail,
      errorName,
      errorPhone,
      errorFile,
      errorPosition,
      disabled
    } = this.state;

    // Available positions
    let optionsList;
    if (options.length) {
      optionsList = options.map((item, index) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
    }

    return (
      <section className="signup" id="signup">
        <h2 className="signup__heading">Register to get a work</h2>
        <p className="signup__attention text-center">
          Attention! After successful registration and alert, update the list of
          users in the block from the top
        </p>
        <div className="container">
          <form className="signup__form">
            <div className="signup__form__inputs">
              <label className={"signup__label " + (errorName ? "error" : "")}>
                <span className="signup__input__heading">Name</span>
                <input
                  onChange={this.handleNameChange}
                  onBlur={this.validateName}
                  value={name}
                  type="text"
                  className="signup__input__field"
                  placeholder="Your name"
                />
                <p className="signup__input__error">
                  {errorName ? "The length of the name is incorrect" : ""}
                </p>
              </label>
              <label className={"signup__label " + (errorEmail ? "error" : "")}>
                <span className="signup__input__heading">Email</span>
                <input
                  onChange={this.handleEmailChange}
                  onBlur={this.validateEmail}
                  value={email}
                  type="text"
                  className="signup__input__field"
                  placeholder="Your email"
                />
                <p className="signup__input__error">
                  {errorEmail ? "Email is incorrect" : ""}
                </p>
              </label>
              <label className={"signup__label " + (errorPhone ? "error" : "")}>
                <span className="signup__input__heading">Phone</span>
                <input
                  maxLength="19"
                  type="tel"
                  className="signup__input__field"
                  placeholder="+38 (___) ___ __ __"
                  value={phone}
                  onChange={this.handlePhoneChange}
                  onBlur={this.validatePhone}
                />
                <p className="signup__input__error">
                  {errorPhone ? "Phone is incorrect" : ""}
                </p>
              </label>
            </div>
            <div className="signup__form__inputs">
              <div className="signup__select__outer">
                <ReactSVG src={require("../icons/caret-down.svg")} />
                <select
                  className={"signup__select " + (errorPosition ? "error" : "")}
                  onChange={this.handlePositionChange}
                >
                  {defaultOption}
                  {optionsList}
                </select>
                <p className="signup__input__error">
                  {errorPosition ? "Please, select a position" : ""}
                </p>
              </div>
              <div
                className={
                  "signup__label signup__label__file " +
                  (errorFile ? "error" : "")
                }
              >
                <span className="signup__input__filename">{fileName}</span>
                <input
                  ref={this.state.imageInput}
                  type="file"
                  onChange={this.handleFileChange}
                />
                <button
                  type="button"
                  className="button signup__input__filebtn"
                  onClick={this.uploadClick}
                >
                  <span className="upload__word">Upload</span>
                  <span className="upload__icon">
                    <ReactSVG src={require("../icons/upload.svg")} />
                  </span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                className="button signup__form__submit"
                onClick={this.submitForm}
                disabled={disabled}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div
          className={"page-hover " + (this.state.menu ? "active" : "")}
          onClick={this.closeMenu}
        />
      </section>
    );
  }
}
