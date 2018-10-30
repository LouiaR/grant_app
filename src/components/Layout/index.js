import React from "react";
import Aux from "../../hoc/aux";
import Header from "./Header";

const layout = props => {
  return (
    <Aux>
      <Header />
      <main className="container">{props.children}</main>
      <footer>© Louis</footer>
    </Aux>
  );
};

export default layout;
