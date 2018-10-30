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
          console.log(value)
          if (grants_list === undefined && title === 'Search Results') {
            console.log('invalid')
          } else if (grants_list === undefined ) {
            return <Spinner />;
          }else {
            return (
              <Aux>
                <Search />
                <h3 className="text-center mb-4">{title}</h3>
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
        }}
      </Consumer>
    );
  }
}

export default Grants;
