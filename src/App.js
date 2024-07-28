import Header from "./Components/Layout/Header";
import React, { useState } from "react";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";

function App(props) {
  const [cartShow, setCartShow] = useState(false);

  const showCartHandler = (event) => {
    setCartShow(true);
  };
  const closeCartHandler = (event) => {
    setCartShow(false);
  };
  return (
    <CartProvider>
      {cartShow && <Cart onCloseCart={closeCartHandler}></Cart>}
      <Header onShowCart={showCartHandler}></Header>
      <Meals></Meals>
    </CartProvider>
  );
}

export default App;
