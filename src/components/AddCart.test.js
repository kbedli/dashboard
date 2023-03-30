import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import AddCart from "./AddCart";

describe("AddCart component", () => {
  test("should render the component", () => {
    render(
      <Provider store={store}>
        <AddCart />
      </Provider>
    );

    expect(screen.getByPlaceholderText("User ID...")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Discount Percentage")).toBeInTheDocument();
    expect(screen.getByText("Add product")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("should add a new product to the list", () => {
    render(
      <Provider store={store}>
        <AddCart />
      </Provider>
    );

    const titleInput = screen.getByLabelText("Title");
    const priceInput = screen.getByLabelText("Price");
    const quantityInput = screen.getByLabelText("Quantity");
    const discountPercentageInput = screen.getByLabelText(
      "Discount Percentage"
    );
    const addButton = screen.getByText("Add product");

    fireEvent.change(titleInput, { target: { value: "Product 1" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.change(quantityInput, { target: { value: "2" } });
    fireEvent.change(discountPercentageInput, { target: { value: "20" } });
    fireEvent.click(addButton);

    const productItem = screen.getByText("Product 1 10 x2 20%");

    expect(productItem).toBeInTheDocument();
  });

  test("should add a new cart to the store", () => {
    render(
      <Provider store={store}>
        <AddCart />
      </Provider>
    );

    const userIdInput = screen.getByPlaceholderText("User ID...");
    const titleInput = screen.getByLabelText("Title");
    const priceInput = screen.getByLabelText("Price");
    const quantityInput = screen.getByLabelText("Quantity");
    const discountPercentageInput = screen.getByLabelText(
      "Discount Percentage"
    );
    const addButton = screen.getByText("Add product");
    const addCartButton = screen.getByText("Add");

    fireEvent.change(userIdInput, { target: { value: "1" } });
    fireEvent.change(titleInput, { target: { value: "Product 1" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.change(quantityInput, { target: { value: "2" } });
    fireEvent.change(discountPercentageInput, { target: { value: "20" } });
    fireEvent.click(addButton);
    fireEvent.click(addCartButton);

    // wait 1 second for the cart to be added to the store
    setTimeout(() => {
      const cartItem = screen.getByText("Product 1 10 x2 20%");
      expect(cartItem).toBeInTheDocument();
      expect(store.getState().carts.length).toBe(1);
    }, 100);
  });
});
