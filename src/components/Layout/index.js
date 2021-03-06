import React from "react";
import Aux from "../../hoc/aux";
import Header from "./Header";
import Promo from './promo';

const layout = props => {
  return (
    <Aux>
      <Header />
      <Promo />
      <main className="container">{props.children}</main>
      <footer>© Louis</footer>
    </Aux>
  );
};

export default layout;
