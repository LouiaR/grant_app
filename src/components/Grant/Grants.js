import React, { Component } from "react";
import { Consumer } from "../../context";
import Grant from "./Grant";
import Spinner from "../Layout/Spinner";
import Aux from "../../hoc/aux";
import Search from './Search';
class Grants extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { grants_list, title} = value;
          const { data } = grants_list;
          if (data === undefined || data.grants.length === 0) {
            return <Spinner />;
          } else {
            const grants = data.grants.slice(data.grants.length - 10); // Last ten grants
            return (
              <Aux>
                <Search />
                <h3 className="text-center mb-4">{title}</h3>
                <div className="row">
                  {grants.map(item => (
                    <Grant
                      grant={item.data}
                      key={item.data.grants_project_id}
                    />
                  ))}
                </div>
              </Aux>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Grants;
