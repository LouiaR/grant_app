import React from "react";
import Aux from "../../hoc/aux";

const layout = props => {
  return (
    <Aux>
      <main className="container-fluid">
        <h1>Promo</h1>
        {props.children}
      </main>
      <footer>Footer</footer>
    </Aux>
  );
};

export default layout;
