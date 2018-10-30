import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Grants from "./components/Grant/Grants";
import GrantPage from "./components/Grant/GrantPage";
import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <Layout>
              <Switch>
                <Route exact path="/" component={Grants} />
                <Route exact path="/grant/:id" component={GrantPage} />
              </Switch>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
