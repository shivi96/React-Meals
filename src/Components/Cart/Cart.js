import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import CheckOutForm from "./CheckOutForm";

const Cart = (props) => {
  const [showForm,setShowForm]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit , setDidSubmit]=useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler=(event)=>{
    setShowForm(true);
  }
  
  const submitHandler=async(cartData)=>{
    setIsSubmitting(true);
    await fetch("https://react-6403c-default-rtdb.firebaseio.com/orders.json",{
      method:"POST",
      body: JSON.stringify({
        user:cartData,
        cartItems:cartCtx.items
      })
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart();
  }

  const cartModal=<React.Fragment>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!showForm && <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
      
      {showForm && <CheckOutForm onSubmit={submitHandler} onCancel={props.onCloseCart}></CheckOutForm>}
  </React.Fragment>

const isSubmittingModal=<p>....Sending Data</p>;
const didSubmitModal=<React.Fragment>
  <p>Successfully Order Placed</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
  </div>
 
</React.Fragment>;

  return (
    <Modal onClick={props.onCloseCart}>
      {isSubmitting  && isSubmittingModal}
      {!isSubmitting&& !didSubmit && cartModal}
      {!isSubmitting && didSubmit  && didSubmitModal}
    </Modal>
  );
};

export default Cart;
