import React from "react";
import App from "../../App";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import createReducer from "../../store/rootReducer";
import "intersection-observer";

const store = configureStore({
  reducer: createReducer,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("Layoutjs", () => {
  it("Check comment textContent is correct or not", () => {
    const { getByTestId } = render(<AppWrapper />);

    const commentEl = getByTestId("comment");
    expect(commentEl.textContent).toBe("Yorumlar");
  });
});

describe("Change cart total price ", () => {
  it("Check total amount is change after clicked button", async () => {
    const { getByTestId } = render(<AppWrapper />);

    const homeRateButton = await screen.findByTestId("home-1");
    const totalAmount = getByTestId("total-amount");
    expect(totalAmount.textContent).toBe("0.0000");
    fireEvent.click(homeRateButton);
    const cartItems = await screen.findAllByTestId("cart-items");

    expect(totalAmount.textContent).toBe("2.3000");
    expect(homeRateButton).toHaveStyle(`background-color:yellow`);
    expect(cartItems).toHaveLength(1);
  });
});

describe("Check background-color", () => {
  it("Is background-color change after clicking the selected button", async () => {
    render(<AppWrapper />);
    const homeRateButton = await screen.findByTestId("home-2");
    fireEvent.click(homeRateButton);
    expect(homeRateButton).toHaveStyle(`background-color:yellow`);
    fireEvent.click(homeRateButton);
    expect(homeRateButton).toHaveStyle(`background-color:`);
  });
});
