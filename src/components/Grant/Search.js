import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    postcode: "",
    ranges: 10
  };

  findGrant = async (dispatch, e) => {
    e.preventDefault();
    console.log('yep')
    try {
      const response = await axios.get(process.env.REACT_APP_URL);
      dispatch({
        type: "POSTCODE_SEARCH",
        payload: response.data
      })
      this.setState({
        grants_list: response.data
      })
    } catch (err) {
      console.log(err)
    } 
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.ranges);

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
