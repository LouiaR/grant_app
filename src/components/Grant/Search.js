import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    postcode: "",
    lat: "",
    long: "",
    error: "",
    isloading: false
  };

  convertPostcode = async postcode => {
    const url = process.env.REACT_APP_POSTCODE;
    try {
      const response = await axios.get(`${url}${postcode}`);
      const { latitude, longitude } = response.data.result;
      this.setState({
        postcode: "",
        error: "",
        lat: latitude,
        long: longitude,
        isloading: true
      });
    } catch (err) {
      // Case where postcode is invalid
      this.setState({
        isloading: false,
        error: "Please enter a valid postcode, example NW1 2DB",
        postcode: ""
      });
    }
  };

  findGrant = async (dispatch, e) => {
    e.preventDefault();
    const { postcode } = this.state;
    if (postcode.length === 0) {
      // Handle empty input
      this.setState({
        error: "Please enter a postcode, example NW1 2DB"
      });
    } else {
      // Handle case where input is provided
      const url = process.env.REACT_APP_GRANT_GE0;
      await this.convertPostcode(postcode);
      const { lat, long } = this.state;
      try {
        const response = await axios.get(
          `${url}latitude=${lat}&longitude=${long}&range=10km`
        );
        if (response.data.status !== "errored") {
          this.setState({
            postcode: "",
            isloading: false
          });
          dispatch({
            type: "POSTCODE_SEARCH",
            payload: response.data.data.grants
          });
        }
      } catch (err) {
        this.setState({
          error: "An error has occured try again"
        });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          const { error, postcode } = this.state;
          let showForm = null;
          showForm = (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas" /> Search Grants
              </h1>
              <p className="lead text-center">
                Get project funded by Comic Relief{" "}
              </p>
              <form onSubmit={this.findGrant.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Postcode..."
                    name="postcode"
                    value={this.state.postcode}
                    onChange={this.onChange}
                  />
                  {error &&
                    postcode.length === 0 && (
                      <span className="help-block text-danger">{error}</span>
                    )}
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Grants
                </button>
              </form>
            </div>
          );
          return showForm;
        }}
      </Consumer>
    );
  }
}

export default Search;
