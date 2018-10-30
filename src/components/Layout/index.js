import React from "react";
import Aux from "../../hoc/aux";
import Header from "./Header";
import Search from "../Grant/Search";

const layout = props => {
  return (
    <Aux>
      <Header />
      <main className="container-fluid">
        <h1>Promo</h1>
        <Search />
        {props.children}
      </main>
      <footer>Footer</footer>
    </Aux>
  );
};

export default layout;
