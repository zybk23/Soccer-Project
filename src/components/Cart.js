import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/css/cart.scss";

function Cart() {
  const { cartData } = useSelector((state) => state.cartSlice);
  const [showCartItem, setShowCartItem] = useState(true);

  let totalRate = 0;
  cartData.forEach((x) => {
    totalRate += Number(x.rate);
  });

  const handleClickButton = () => {
    setShowCartItem(!showCartItem);
  };

  const [screenSize, getDimension] = useState(window.innerWidth);
  const setDimension = () => {
    getDimension(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    if (screenSize >= 820) {
      setShowCartItem(true);
    }

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="cart-container">
      {screenSize < 820 && (
        <div className="cart-button-container" onClick={handleClickButton}>
          <img
            className="cart-button-image"
            src={`images/${showCartItem ? "down.png" : "up.png"}`}
            alt=""
          />
        </div>
      )}
      {showCartItem && (
        <div className="cart-item-scroll">
          {cartData.map((item) => (
            <div
              data-testid="cart-items"
              className="cart-item-container"
              key={item.id}
            >
              <div className="cart-item-line">
                <p className="cart-item-line-text">4</p>
                <p className="cart-item-line-text">Kod:{item.code}</p>
                <p className="cart-item-line-text">Maç:{item.teams}</p>
              </div>
              <div
                style={{ justifyContent: "flex-start" }}
                className="cart-item-line"
                temSecondLine
              >
                <p className="cart-item-line-text">Oran:{item.rate}</p>
                <p
                  style={{ marginLeft: "16px" }}
                  className="cart-item-line-text"
                  marginleft="16px"
                >
                  MBS:{item.mbs}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total-amount-container">
        <p className="cart-total-amount-text">Toplam Tutar : </p>
        <p className="cart-total-amount-text" data-testid="total-amount">
          {totalRate.toFixed(4)}
        </p>
      </div>
    </div>
  );
}

export default React.memo(Cart);
