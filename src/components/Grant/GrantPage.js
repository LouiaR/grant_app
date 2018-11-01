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
                <div className="grant-info">
                  <span className="grant-label">
                    <div> {start_date}</div>{" "}
                    <div className="label">start date</div>
                  </span>{" "}
                  |{" "}
                  <span className="grant-label">
                    {" "}
                    <div>{country_name}</div>{" "}
                    <div className="label">Beneficiary country</div>
                  </span>{" "}
                  |{" "}
                  <span className="grant-label">
                    <div>£{amount_awarded}</div>{" "}
                    <div className="label">Amount</div>
                  </span>{" "}
                  |{" "}
                  <span className="grant-label">
                    <div>{region}</div>{" "}
                    <div className="label">Office location</div>
                  </span>
                </div>
              </div>
              <div className="card-body ">
                <h5 className="card-title">Issue: {issue}</h5>
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
