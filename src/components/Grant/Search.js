import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    postcode: "",
    error: ""
  };

  convertPostcode = async postcode => {
    const url = process.env.REACT_APP_POSTCODE;
    try {
      const response = await axios.get(`${url}${postcode}`);
      const { latitude, longitude } = response.data.result;
      this.setState({
        postcode: {
          latitude,
          longitude
        },
        error: ""
      });
    } catch (err) {
      // Case where postcode is invalid
      this.setState({
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
        error: "Please enter a postcode"
      });
    } else {
      // Handle case where input is provided
      const url = process.env.REACT_APP_GRANT_GE0;
      await this.convertPostcode(postcode);
      const { latitude, longitude } = this.state.postcode;
      try {
        const response = await axios.get(
          `${url}latitude=${latitude}&longitude=${longitude}&range=10km`
        );
        if (response.data.status !== "errored") {
          // Case where postcode is valid
          this.setState({
            postcode: ""
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
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas" /> Search A Grant
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
        }}
      </Consumer>
    );
  }
}

export default Search;
