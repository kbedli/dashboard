import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CartsItem from "./CartsItem";

describe("CartsItem", () => {
  const cart = {
    id: "cart-1",
    products: [
      { title: "Product 1", price: 10, quantity: 1, total: 10 },
      { title: "Product 2", price: 15, quantity: 2, total: 30 },
    ],
    total: 40,
    discountedTotal: 35,
    userId: "user-1",
  };

  it("renders the cart details", () => {
    render(
      <table>
        <tbody>
          <CartsItem
            selectedCart={null}
            setSelectedCart={() => {}}
            cart={cart}
            removeCart={() => {}}
          />
        </tbody>
      </table>,
      { suppressConsoleErrors: true }
    );

    const cartElement = screen.getByTestId("cart-item");
    expect(cartElement).toBeInTheDocument();

    const userElement = screen.getByText("User: user-1");
    expect(userElement).toBeInTheDocument();

    const productsElement = screen.getByText("products:");
    expect(productsElement).toBeInTheDocument();

    const totalElement = screen.getByText("total: 40");
    expect(totalElement).toBeInTheDocument();

    const discountedTotalElement = screen.getByText("discounted total: 35");
    expect(discountedTotalElement).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove-button");
    expect(removeButton).toBeInTheDocument();
  });

  it("calls the removeCart function when the remove button is clicked", () => {
    const removeCartMock = jest.fn();

    render(
      <table>
        <tbody>
          <CartsItem
            selectedCart={null}
            setSelectedCart={() => {}}
            cart={cart}
            removeCart={removeCartMock}
          />
        </tbody>
      </table>
    );

    const removeButton = screen.getByTestId("remove-button");
    fireEvent.click(removeButton);

    expect(removeCartMock).toHaveBeenCalledWith("cart-1");
  });

  it("expands and collapses the product details when the accordion button is clicked", () => {
    render(
      <table>
        <tbody>
          <CartsItem
            selectedCart={null}
            setSelectedCart={() => {}}
            cart={cart}
            removeCart={() => {}}
          />
        </tbody>
      </table>
    );

    setTimeout(() => {
      const accordionButton = screen.getByTestId("toggler");
      expect(accordionButton.textContent).toBe("+");

      fireEvent.click(accordionButton);
      setTimeout(() => {
        expect(accordionButton.textContent).toBe("-");
      }, 100);

      const productTitle1 = screen.getByText("title: Product 1");
      expect(productTitle1).toBeInTheDocument();

      const productTitle2 = screen.getByText("title: Product 2");
      expect(productTitle2).toBeInTheDocument();

      fireEvent.click(accordionButton);
      expect(accordionButton.textContent).toBe("+");

      expect(productTitle1).not.toBeInTheDocument();
      expect(productTitle2).not.toBeInTheDocument();
    }, 100);
  });
});
