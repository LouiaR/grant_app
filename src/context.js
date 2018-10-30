import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case "POSTCODE_SEARCH":
      return {
        ...state,
        grants_list: action.payload,
        title: 'Search Results'
      }
    default:
      return state;  
  }
}

export class Provider extends Component {
    state = {
        grants_list: [],
        title: 'Some projects funded by Comic Relief',
        dispatch: action => this.setState(state => reducer(state, action))
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