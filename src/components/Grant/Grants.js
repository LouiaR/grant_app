import React, { Component } from "react";
import { Consumer } from "../../context";
import Grant from "./Grant";
import Spinner from "../Layout/Spinner";
import Aux from "../../hoc/aux";
import Search from "./Search";
class Grants extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { grants_list, title } = value;
          let result = null;
          if (grants_list === undefined || grants_list.length === 0) {
            result = <Spinner />;
          } else {
            result = (
              <Aux>
                <Search />
                <h3 className="text-center mb-4">
                  {title}{" "}
                  {title === "Search Results" && (
                    <span>
                      We found {grants_list.length}{" "}
                      {grants_list.length > 1 ? "results" : result}{" "}
                    </span>
                  )}
                </h3>
                <div className="row">
                  {grants_list.map(item => (
                    <Grant
                      grant={item.data}
                      key={item.data.grants_project_id}
                    />
                  ))}
                </div>
              </Aux>
            );
          }
          return <Aux>{result}</Aux>;
        }}
      </Consumer>
    );
  }
}

export default Grants;
