import React from "react";
import styles from "./Header.module.css";
import image from "../../assests/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="not found" />
      </div>
    </React.Fragment>
  );
};

export default Header;
