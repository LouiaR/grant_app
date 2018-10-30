import React from "react";
import Aux from "../../hoc/aux";
import Header from "./Header";

const layout = props => {
  return (
    <Aux>
      <Header />
      <main className="container">
        <h1>Promo</h1>
        {props.children}
      </main>
      <footer>Footer</footer>
    </Aux>
  );
};

export default layout;
