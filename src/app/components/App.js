import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  state = {
    openedIndex: 0,
    firstLoad: true,

    form: {
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      comment: ""
    },

    errors: {
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      comment: ""
    },

    success: false
  };

  verifyData = () => {
    const errors = {};
    const { form } = this.state;

    if (form.firstName === "") errors.firstName = "First name is required";
    if (form.surname === "") errors.surname = "Surname is required";
    if (form.email === "") errors.email = "E-mail is required";
    if (form.phone === "") errors.phone = "Phone number is required";
    if (form.gender === "Select Gender") errors.gender = "Please pick a gender";
    if (form.dob === "") errors.dob = "Date of Birth is required";

    this.setState({ errors });

    if (Object.keys(errors).length === 0) return true;

    //Otherwise no errors
    this.goToErrors(errors);
    return false;

    //TODO: make more verifications
  };

  goToErrors = errors => {
    if (errors.firstName || errors.surname || errors.email)
      this.handleSetOpenedIndex(0);
    else if (errors.phone || errors.gender || errors.dob)
      this.handleSetOpenedIndex(1);
    else if (errors.comment) this.handleSetOpenedIndex(2);
  };

  handleUpdate = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    //verify the data

    if (this.verifyData())
      axios
        .post("/api/form", this.state.form)
        .then(res => this.setState({ success: true }))
        .catch(err => {
          const { errors } = err.response.data;
          this.setState({ errors });
          this.goToErrors(errors);
        });
  };

  handleNext = () => {
    const { openedIndex } = this.state;
    if (openedIndex < 2) {
      //Go to next section rather than submit form
      this.setState({ openedIndex: openedIndex + 1 });
    } else {
      this.handleSubmit();
    }
  };

  handleSetOpenedIndex = i => {
    this.setState({ openedIndex: i });
  };

  componentDidMount() {
    //this.setState({ firstLoad: false });
    setInterval(() => this.setState({ firstLoad: false }), 1000);
  }

  render() {
    const { openedIndex, errors, success } = this.state;
    return (
      <div className="form">
        <div className="form-inner">
          <div className="form-section">
            <h4 onClick={() => this.handleSetOpenedIndex(0)}>
              Step 1: Your details
            </h4>
            <div className={openedIndex === 0 ? "opened" : "closed"}>
              <div className="inner">
                <div className="column-label">
                  <label>First Name</label>
                  <input
                    onChange={e => this.handleUpdate(e)}
                    name="firstName"
                    id="firstName"
                    type="text"
                  ></input>
                </div>
                <div className="column-label">
                  <label>Surname</label>
                  <input
                    type="text"
                    onChange={e => this.handleUpdate(e)}
                    name="surname"
                    id="surname"
                  ></input>
                </div>
                <div className="column-label">
                  <label>Email Address</label>
                  <input
                    type="text"
                    onChange={e => this.handleUpdate(e)}
                    name="email"
                    id="email"
                  ></input>
                </div>
              </div>
              {errors.firstName && <p className="error">{errors.firstName}</p>}
              {errors.surname && <p className="error">{errors.surname}</p>}
              {errors.email && <p className="error">{errors.email}</p>}
              <button onClick={this.handleNext}>Next ></button>
            </div>
          </div>

          <div className="form-section">
            <h4 onClick={() => this.handleSetOpenedIndex(1)}>
              Step 2: More comments
            </h4>
            <div className={openedIndex === 1 ? "opened" : "closed"}>
              <div className="inner">
                <div className="column-label">
                  <label>Telephone Number</label>
                  <input
                    type="text"
                    onChange={e => this.handleUpdate(e)}
                    name="phone"
                    id="phone"
                  ></input>
                </div>
                <div className="column-label">
                  <label>Gender</label>
                  <select
                    name="gender"
                    onChange={e => this.handleUpdate(e)}
                    name="gender"
                    id="gender"
                  >
                    <option>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="column-label">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    onChange={e => this.handleUpdate(e)}
                    name="dob"
                    id="dob"
                  ></input>
                </div>
              </div>
              {errors.phone && <p className="error">{errors.phone}</p>}
              {errors.gender && <p className="error">{errors.gender}</p>}
              {errors.dob && <p className="error">{errors.dob}</p>}
              <button onClick={this.handleNext}>Next ></button>
            </div>
          </div>

          <div className="form-section">
            <h4 onClick={() => this.handleSetOpenedIndex(2)}>
              Step 3: Final comments
            </h4>
            <div className={openedIndex === 2 ? "opened" : "closed"}>
              <div className="inner">
                <div className="column-label">
                  <label>Comments</label>
                  <textarea
                    onChange={e => this.handleUpdate(e)}
                    name="comment"
                    id="comment"
                  ></textarea>
                </div>
              </div>
              {errors.comment && <p className="error">{errors.comment}</p>}
              {success && (
                <p className="success">
                  Your form has been successfully submitted. Thank you.
                </p>
              )}
              <button onClick={this.handleNext}>Next ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
