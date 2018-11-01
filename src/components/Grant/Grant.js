import React from "react";
import { Link } from "react-router-dom";

const Grant = props => {
  const {
    name,
    issue,
    start_date,
    country_name,
    amount_awarded,
    copywritten_summary,
    grants_project_id,
    region
  } = props.grant;
  return (
    <div className="col-md-6">
      <div className="card  mb-4">
        <div className="card-header">
          <h2>{name.replace("\\u0027", "'")}</h2>
          <div className="grant-info">
            <span className="grant-label">
              <div> {start_date}</div> <div className="label">start date</div>
            </span>{" "}
            |{" "}
            <span className="grant-label">
              {" "}
              <div>{country_name}</div>{" "}
              <div className="label">Beneficiary country</div>
            </span>{" "}
            |{" "}
            <span className="grant-label">
              <div>£{amount_awarded}</div> <div className="label">Amount</div>
            </span>{" "}
            |{" "}
            <span className="grant-label">
              <div>{region}</div> <div className="label">Office location</div>
            </span>
          </div>
        </div>
        <div className="card-body ">
          <h5 className="card-title">Issue: {issue}</h5>
          <p className="card-text summary">{copywritten_summary}</p>
        </div>
        <div className="card-footer bg-transparent ">
          <p>
            <Link to={`/grant/${grants_project_id}`}>
              <i className="fas fa-chevron-right" />
              View More
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Grant;
