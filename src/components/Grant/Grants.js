import React, { Component } from "react";
import { Consumer } from "../../context";
import Grant from "./Grant";
import Spinner from "../Layout/Spinner";
class Grants extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { grants_list } = value;
          const { data } = grants_list;
          if (data === undefined || data.grants.length === 0) {
            return <Spinner />;
          } else {
            return (
              <div className="row">
                {data.grants.map(item =>
                <Grant grant={item.data} key={item.data.grants_project_id} />)}
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Grants;
