import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

export class Provider extends Component {
    state = {
        grants_list: [],
        title: 'Some projects funded by Comic Relief'
    }
    
  async componentDidMount() {
    try {
      const response = await axios.get(process.env.REACT_APP_URL);
      this.setState({
        grants_list: response.data
      })
    } catch (err) {
      console.log(err)
    } 
  } 

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }  
}

export const Consumer = Context.Consumer;