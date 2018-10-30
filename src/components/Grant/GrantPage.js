import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../Layout/Spinner";
import Aux from "../../hoc/aux";

class GrantPage extends Component {
  state = {
    grant: []
  };

  async componentDidMount() {
    const url = process.env.REACT_APP_URL;
    try {
      const response = await axios.get(`${url}/${this.props.match.params.id}`);
      const { data } = response.data;
      this.setState({
        grant: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      name,
      issue,
      start_date,
      country_name,
      amount_awarded,
      copywritten_summary,
      region
    } = this.state.grant;
    if (this.state.grant.length === 0) {
      return <Spinner />;
    } else {
      return (
        <Aux>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="col">
            <div className="card  mb-4">
              <div className="card-header">
                <h2>{name.replace("\\u0027", "'")}</h2>
                <p>
                  <span>{start_date}</span> | <span>{country_name}</span> |{" "}
                  <span>£{amount_awarded}</span> | <span>{region}</span>
                </p>
              </div>
              <div className="card-body ">
                <h5 className="card-title">{issue}</h5>
                <p className="card-text">{copywritten_summary}</p>
              </div>
              <div className="card-footer bg-transparent " />
            </div>
          </div>
        </Aux>
      );
    }
  }
}

export default GrantPage;
