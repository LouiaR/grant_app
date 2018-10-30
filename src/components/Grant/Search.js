import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    postcode: "",
    ranges: 10,
    error: ''
  };

  convertPostcode = async postcode => {
    const url = process.env.REACT_APP_POSTCODE;
    try {
      const response = await axios.get(`${url}${postcode}`);
      this.setState({
        postcode: response.data,
        error: ''
      });
    } catch (err) {
      this.setState({
        error: 'Invalid Postcode'
      })
    }
  };

  findGrant = async (dispatch, e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_GRANT_GE0; 
    console.log(url)
    await this.convertPostcode(this.state.postcode);
    try {
    const { error } = this.state;
      const response = await axios.get(`${url}latitude=51.515861&longitude=-0.1318827&range=10km`);
      if(error.length > 1) {
        console.log('invalid')
      }
      dispatch({
        type: "POSTCODE_SEARCH",
        payload: response.data
      });
      this.setState({
        grants_list: response.data,
        postcode: ''
      });
    } catch (err) {
      console.log(this.state.error);
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
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas" /> Search For A Grant
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
                  <input
                    type="range"
                    name="slide"
                    max={100}
                    min={0}
                    value={this.state.ranges}
                    onChange={this.onChange}
                  />
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
