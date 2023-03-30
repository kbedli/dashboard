import React, { useMemo } from "react";
import { Cart } from "../types";

interface Props {
  selectedCart: Cart | null;
  setSelectedCart: (cart: Cart | null) => void;
  cart: Cart;
  removeCart: (id: string) => void;
}

const CartsItem: React.FC<Props> = ({
  selectedCart,
  setSelectedCart,
  cart,
  removeCart,
}) => {
  const { id, products, total, discountedTotal, userId } = cart;

  const isSelected = useMemo(
    () => selectedCart && selectedCart.id === id,
    [selectedCart]
  );

  return (
    <tr key={id} className="tr" data-testid="cart-item">
      <th>User: {userId}</th>

      <th className="products">
        <div className="accordion">
          <button
            type="button"
            data-testid="toggler"
            className="btn"
            onClick={() => {
              if (isSelected) {
                setSelectedCart(null);
              } else {
                setSelectedCart(cart);
              }
            }}
          >
            {isSelected ? "-" : "+"}
          </button>
          <p>products:</p>
        </div>
        {isSelected && (
          <>
            {products.map((product, ind) => {
              const { title, price, quantity, total } = product;
              return (
                <div key={ind} className="product" style={{ display: "flex" }}>
                  <p>title: {title} </p>
                  <p> price: {price} </p>
                  <p> quantity: {quantity} </p>
                  <p> total: {total}</p>
                </div>
              );
            })}
          </>
        )}
      </th>
      <th>total: {total}</th>
      <th>discounted total: {discountedTotal}</th>
      <th>
        <button
          type="button"
          data-testid="remove-button"
          className="remove-button"
          onClick={() => removeCart(id)}
        >
          Remove
        </button>
      </th>
    </tr>
  );
};

export default CartsItem;
