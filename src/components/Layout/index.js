import React from "react";
import Aux from "../../hoc/aux";
import Header from "./Header";

const layout = props => {
  return (
    <Aux>
      <Header />
      <main>
        <h1>Promo</h1>
        <div className="container">{props.children}</div>
      </main>
      <footer>Footer</footer>
    </Aux>
  );
};

export default layout;
