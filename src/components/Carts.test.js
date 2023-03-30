import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { update } from "../redux/cartsSlice";
import store from "../redux/store";
import Carts from "./Carts";

describe("Carts component", () => {
  const mockCarts = [
    {
      id: "1",
      products: [{ title: "Product 1", price: 10, quantity: 2, total: 20 }],
      total: 20,
      discountedTotal: 18,
      userId: 1,
    },
    {
      id: "2",
      products: [{ title: "Product 2", price: 5, quantity: 3, total: 15 }],
      total: 15,
      discountedTotal: 14,
      userId: 2,
    },
  ];

  beforeEach(() => {
    jest.spyOn(store, "dispatch").mockImplementation(() => {});
    // add the mock carts to the store
    store.dispatch(update(mockCarts));
    setTimeout(() => {}, 1000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render a table with cart items", () => {
    render(
      <Provider store={store}>
        <Carts selectedCart={null} setSelectedCart={() => {}} />
      </Provider>
    );

    // wait for the table to be rendered
    store.dispatch(update(mockCarts));

    setTimeout(() => {
      const tableElement = screen.getByRole("table");
      expect(tableElement).toBeInTheDocument();

      const cartItems = screen.getAllByTestId("cart-item");
      expect(cartItems).toHaveLength(mockCarts.length + 1); // +1 because of the table header
    }, [100]);
  });

  it("should call the removeCart function when the remove button is clicked", () => {
    const mockRemoveCart = jest.fn();

    render(
      <Provider store={store}>
        <Carts
          selectedCart={null}
          setSelectedCart={() => {}}
          removeCart={mockRemoveCart}
        />
      </Provider>
    );

    setTimeout(() => {
      const removeButton = screen.getAllByRole("button", {
        name: /Remove/i,
      })[0];
      fireEvent.click(removeButton);

      expect(mockRemoveCart).toHaveBeenCalledTimes(1);
    }, [100]);
  });
});
